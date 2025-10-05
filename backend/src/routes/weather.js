const express = require('express');
const router = express.Router();
const Joi = require('joi');
const weatherService = require('../services/weatherService');
const cacheService = require('../services/cacheService');

// Validation schemas
const weatherQuerySchema = Joi.object({
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
    name: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    displayName: Joi.string().optional(),
    type: Joi.string().optional(),
    importance: Joi.number().optional()
  }).required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  conditions: Joi.array().items(
    Joi.string().valid('temperature', 'precipitation', 'wind', 'airQuality', 'comfort')
  ).min(1).required()
});

// Get weather probabilities for a location and date
router.post('/probabilities', async (req, res) => {
  try {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));
    const { error, value } = weatherQuerySchema.validate(req.body);
    if (error) {
      console.log('Validation error:', error.details);
      return res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { location, date, conditions } = value;
    
    // Generate cache key
    const cacheKey = `weather:${location.lat}:${location.lng}:${date}:${conditions.join(',')}`;
    
    // Try to get from cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json({
        ...cached,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    // Fetch fresh data
    const weatherData = await weatherService.getWeatherProbabilities(location, date, conditions);
    
    // Cache for 1 hour
    await cacheService.set(cacheKey, weatherData, 3600);
    
    res.json({
      ...weatherData,
      cached: false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      message: error.message
    });
  }
});

// Get historical weather data for analysis
router.get('/historical/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { startDate, endDate, condition } = req.query;
    
    const cacheKey = `historical:${lat}:${lng}:${startDate}:${endDate}:${condition}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json({
        ...cached,
        cached: true
      });
    }

    const historicalData = await weatherService.getHistoricalData(
      parseFloat(lat), 
      parseFloat(lng), 
      startDate, 
      endDate, 
      condition
    );
    
    await cacheService.set(cacheKey, historicalData, 7200); // Cache for 2 hours
    
    res.json({
      ...historicalData,
      cached: false
    });

  } catch (error) {
    console.error('Historical weather error:', error);
    res.status(500).json({
      error: 'Failed to fetch historical data',
      message: error.message
    });
  }
});

// Get weather conditions for multiple locations (batch processing)
router.post('/batch', async (req, res) => {
  try {
    const { locations, date, conditions } = req.body;
    
    if (!Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({
        error: 'Locations array is required'
      });
    }

    const results = await Promise.all(
      locations.map(async (location) => {
        try {
          const data = await weatherService.getWeatherProbabilities(location, date, conditions);
          return { location, data, success: true };
        } catch (error) {
          return { location, error: error.message, success: false };
        }
      })
    );

    res.json({
      results,
      timestamp: new Date().toISOString(),
      total: results.length,
      successful: results.filter(r => r.success).length
    });

  } catch (error) {
    console.error('Batch weather error:', error);
    res.status(500).json({
      error: 'Failed to process batch request',
      message: error.message
    });
  }
});

module.exports = router;
// OpenWeather current weather proxy (GET /api/weather/openweather/current?lat=&lng=)
router.get('/openweather/current', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }

    const cacheKey = `ow_current:${lat}:${lng}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const data = await weatherService.getOpenWeatherCurrent(lat, lng);
    await cacheService.set(cacheKey, data, 300);
    res.json({ ...data, cached: false, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('OpenWeather current error:', err);
    res.status(500).json({ error: 'Failed to fetch OpenWeather data', message: err.message });
  }
});
