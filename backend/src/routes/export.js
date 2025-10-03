const express = require('express');
const router = express.Router();
const exportService = require('../services/exportService');
const weatherService = require('../services/weatherService');
const Joi = require('joi');

// Validation schema for export requests
const exportSchema = Joi.object({
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
    name: Joi.string().optional()
  }).required(),
  date: Joi.string().isoDate().required(),
  conditions: Joi.array().items(
    Joi.string().valid('temperature', 'precipitation', 'wind', 'airQuality', 'comfort')
  ).min(1).required(),
  format: Joi.string().valid('csv', 'json').default('csv'),
  includeMetadata: Joi.boolean().default(true)
});

// Export weather data
router.post('/weather', async (req, res) => {
  try {
    const { error, value } = exportSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { location, date, conditions, format, includeMetadata } = value;
    
    // Get weather data
    const weatherData = await weatherService.getWeatherProbabilities(location, date, conditions);
    
    // Generate export
    const exportData = await exportService.generateExport(weatherData, {
      location,
      date,
      conditions,
      format,
      includeMetadata
    });

    // Set appropriate headers based on format
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="weather-data-${date}.csv"`);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="weather-data-${date}.json"`);
    }

    res.send(exportData);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      error: 'Failed to export data',
      message: error.message
    });
  }
});

// Export historical data
router.post('/historical', async (req, res) => {
  try {
    const { lat, lng, startDate, endDate, condition, format = 'csv' } = req.body;
    
    if (!lat || !lng || !startDate || !endDate || !condition) {
      return res.status(400).json({
        error: 'Missing required parameters: lat, lng, startDate, endDate, condition'
      });
    }

    // Get historical data
    const historicalData = await weatherService.getHistoricalData(
      parseFloat(lat), 
      parseFloat(lng), 
      startDate, 
      endDate, 
      condition
    );
    
    // Generate export
    const exportData = await exportService.generateHistoricalExport(historicalData, {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      startDate,
      endDate,
      condition,
      format
    });

    // Set appropriate headers
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="historical-weather-${startDate}-to-${endDate}.csv"`);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="historical-weather-${startDate}-to-${endDate}.json"`);
    }

    res.send(exportData);

  } catch (error) {
    console.error('Historical export error:', error);
    res.status(500).json({
      error: 'Failed to export historical data',
      message: error.message
    });
  }
});

// Generate PDF report
router.post('/report', async (req, res) => {
  try {
    const { location, date, conditions, includeCharts = true } = req.body;
    
    if (!location || !date || !conditions) {
      return res.status(400).json({
        error: 'Missing required parameters: location, date, conditions'
      });
    }

    // Get weather data
    const weatherData = await weatherService.getWeatherProbabilities(location, date, conditions);
    
    // Generate PDF report
    const pdfBuffer = await exportService.generatePDFReport(weatherData, {
      location,
      date,
      conditions,
      includeCharts
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="weather-report-${date}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF report error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF report',
      message: error.message
    });
  }
});

module.exports = router;
