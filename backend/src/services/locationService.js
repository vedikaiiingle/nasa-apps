const axios = require('axios');

class LocationService {
  constructor() {
    // Using Nominatim (OpenStreetMap) for geocoding as it's free and reliable
    this.nominatimBaseUrl = 'https://nominatim.openstreetmap.org';
  }

  /**
   * Search for locations by name
   */
  async searchLocations(query, limit = 10) {
    try {
      const response = await axios.get(`${this.nominatimBaseUrl}/search`, {
        params: {
          q: query,
          format: 'json',
          limit,
          addressdetails: 1,
          extratags: 1
        },
        headers: {
          'User-Agent': 'WeatherParadeApp/1.0'
        }
      });

      return response.data.map(item => ({
        name: this.formatLocationName(item),
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        country: item.address?.country || '',
        state: item.address?.state || '',
        city: item.address?.city || item.address?.town || '',
        type: item.type,
        importance: item.importance,
        displayName: item.display_name
      }));

    } catch (error) {
      console.error('Location search error:', error);
      
      // Fallback to hardcoded popular locations if API fails
      return this.getFallbackLocations(query);
    }
  }

  /**
   * Reverse geocoding - get location name from coordinates
   */
  async reverseGeocode(lat, lng) {
    try {
      const response = await axios.get(`${this.nominatimBaseUrl}/reverse`, {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1
        },
        headers: {
          'User-Agent': 'WeatherParadeApp/1.0'
        }
      });

      const data = response.data;
      return {
        name: this.formatLocationName(data),
        country: data.address?.country || '',
        state: data.address?.state || '',
        city: data.address?.city || data.address?.town || '',
        displayName: data.display_name,
        type: data.type
      };

    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        country: '',
        state: '',
        city: '',
        displayName: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        type: 'coordinates'
      };
    }
  }

  /**
   * Format location name from address components
   */
  formatLocationName(data) {
    const parts = [];
    
    if (data.address?.city) parts.push(data.address.city);
    else if (data.address?.town) parts.push(data.address.town);
    else if (data.address?.village) parts.push(data.address.village);
    
    if (data.address?.state) parts.push(data.address.state);
    if (data.address?.country) parts.push(data.address.country);
    
    return parts.length > 0 ? parts.join(', ') : data.display_name;
  }

  /**
   * Fallback locations if API fails
   */
  getFallbackLocations(query) {
    const popularLocations = [
      { name: 'New York, NY, USA', lat: 40.7128, lng: -74.0060, country: 'USA', city: 'New York', state: 'NY' },
      { name: 'London, UK', lat: 51.5074, lng: -0.1278, country: 'UK', city: 'London', state: 'England' },
      { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, country: 'Japan', city: 'Tokyo', state: 'Tokyo' },
      { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, country: 'Australia', city: 'Sydney', state: 'NSW' },
      { name: 'Paris, France', lat: 48.8566, lng: 2.3522, country: 'France', city: 'Paris', state: 'Île-de-France' },
      { name: 'Los Angeles, CA, USA', lat: 34.0522, lng: -118.2437, country: 'USA', city: 'Los Angeles', state: 'CA' },
      { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777, country: 'India', city: 'Mumbai', state: 'Maharashtra' },
      { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, country: 'Brazil', city: 'São Paulo', state: 'SP' }
    ];

    // Simple fuzzy search
    const queryLower = query.toLowerCase();
    return popularLocations.filter(location => 
      location.name.toLowerCase().includes(queryLower) ||
      location.city.toLowerCase().includes(queryLower) ||
      location.country.toLowerCase().includes(queryLower)
    ).slice(0, 10);
  }

  /**
   * Validate coordinates
   */
  validateCoordinates(lat, lng) {
    return {
      valid: lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
  }

  /**
   * Get distance between two coordinates (in kilometers)
   */
  getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

module.exports = new LocationService();
