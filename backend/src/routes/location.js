const express = require('express');
const router = express.Router();
const locationService = require('../services/locationService');
const cacheService = require('../services/cacheService');

// Search locations by name
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(400).json({
        error: 'Search query must be at least 2 characters'
      });
    }

    const cacheKey = `location_search:${q}:${limit}`;
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return res.json({
        ...cached,
        cached: true
      });
    }

    const locations = await locationService.searchLocations(q, parseInt(limit));
    
    const result = {
      query: q,
      locations,
      total: locations.length,
      timestamp: new Date().toISOString()
    };

    await cacheService.set(cacheKey, result, 1800); // Cache for 30 minutes
    res.json({ ...result, cached: false });

  } catch (error) {
    console.error('Location search error:', error);
    res.status(500).json({
      error: 'Failed to search locations',
      message: error.message
    });
  }
});

// Get location details by coordinates
router.get('/reverse/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    
    const cacheKey = `reverse_geocode:${lat}:${lng}`;
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return res.json({
        ...cached,
        cached: true
      });
    }

    const location = await locationService.reverseGeocode(
      parseFloat(lat), 
      parseFloat(lng)
    );
    
    const result = {
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
      location,
      timestamp: new Date().toISOString()
    };

    await cacheService.set(cacheKey, result, 3600); // Cache for 1 hour
    res.json({ ...result, cached: false });

  } catch (error) {
    console.error('Reverse geocoding error:', error);
    res.status(500).json({
      error: 'Failed to reverse geocode',
      message: error.message
    });
  }
});

// Get popular locations
router.get('/popular', async (req, res) => {
  try {
    const cacheKey = 'popular_locations';
    const cached = await cacheService.get(cacheKey);
    
    if (cached) {
      return res.json({
        ...cached,
        cached: true
      });
    }

    const popularLocations = [
      { name: 'New York, NY', lat: 40.7128, lng: -74.0060, country: 'USA' },
      { name: 'London, UK', lat: 51.5074, lng: -0.1278, country: 'UK' },
      { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, country: 'Japan' },
      { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, country: 'Australia' },
      { name: 'Paris, France', lat: 48.8566, lng: 2.3522, country: 'France' },
      { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, country: 'USA' },
      { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777, country: 'India' },
      { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, country: 'Brazil' }
    ];

    const result = {
      locations: popularLocations,
      timestamp: new Date().toISOString()
    };

    await cacheService.set(cacheKey, result, 3600); // Cache for 1 hour
    res.json({ ...result, cached: false });

  } catch (error) {
    console.error('Popular locations error:', error);
    res.status(500).json({
      error: 'Failed to fetch popular locations',
      message: error.message
    });
  }
});

module.exports = router;
