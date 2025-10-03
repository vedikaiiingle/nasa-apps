const axios = require('axios');

class WeatherService {
  constructor() {
    this.nasaBaseUrl = 'https://cmr.earthdata.nasa.gov/search';
    this.gibsBaseUrl = 'https://gibs.earthdata.nasa.gov';
    this.username = process.env.NASA_USERNAME;
    this.password = process.env.NASA_PASSWORD;
  }

  /**
   * Get weather probabilities for a location and date
   */
  async getWeatherProbabilities(location, date, conditions) {
    try {
      const results = {};
      
      // Process each condition
      for (const condition of conditions) {
        switch (condition) {
          case 'temperature':
            results.temperature = await this.getTemperatureProbability(location, date);
            break;
          case 'precipitation':
            results.precipitation = await this.getPrecipitationProbability(location, date);
            break;
          case 'wind':
            results.wind = await this.getWindProbability(location, date);
            break;
          case 'airQuality':
            results.airQuality = await this.getAirQualityProbability(location, date);
            break;
          case 'comfort':
            results.comfort = await this.getComfortIndex(location, date);
            break;
        }
      }

      return {
        location,
        date,
        conditions: results,
        metadata: {
          dataSource: 'NASA Earth Observation Data',
          generatedAt: new Date().toISOString(),
          units: {
            temperature: 'Celsius',
            precipitation: 'mm',
            wind: 'm/s',
            airQuality: 'AQI',
            comfort: 'index (0-100)'
          }
        }
      };

    } catch (error) {
      console.error('Error getting weather probabilities:', error);
      throw new Error('Failed to fetch weather data from NASA APIs');
    }
  }

  /**
   * Get temperature probability data
   */
  async getTemperatureProbability(location, date) {
    // Simulate NASA data processing - replace with actual API calls
    const month = new Date(date).getMonth();
    const lat = location.lat;
    
    // Simple probability calculation based on location and season
    let hotProbability, coldProbability;
    
    if (Math.abs(lat) < 23.5) { // Tropical
      hotProbability = 0.8;
      coldProbability = 0.1;
    } else if (Math.abs(lat) < 40) { // Temperate
      hotProbability = month >= 5 && month <= 9 ? 0.6 : 0.2;
      coldProbability = month >= 11 || month <= 2 ? 0.5 : 0.1;
    } else { // Polar
      hotProbability = 0.1;
      coldProbability = 0.7;
    }

    return {
      veryHot: Math.round(hotProbability * 100),
      veryCold: Math.round(coldProbability * 100),
      average: Math.round((hotProbability + (1 - coldProbability)) / 2 * 100),
      threshold: {
        hot: 35, // 35°C
        cold: 0   // 0°C
      }
    };
  }

  /**
   * Get precipitation probability data
   */
  async getPrecipitationProbability(location, date) {
    const month = new Date(date).getMonth();
    const lat = location.lat;
    
    // Seasonal and latitudinal precipitation patterns
    let precipitationProbability;
    
    if (Math.abs(lat) < 10) { // Equatorial
      precipitationProbability = 0.7;
    } else if (Math.abs(lat) < 30) { // Tropical/Subtropical
      precipitationProbability = month >= 5 && month <= 10 ? 0.6 : 0.3;
    } else if (Math.abs(lat) < 60) { // Temperate
      precipitationProbability = 0.4;
    } else { // Polar
      precipitationProbability = 0.2;
    }

    return {
      veryWet: Math.round(precipitationProbability * 100),
      dry: Math.round((1 - precipitationProbability) * 100),
      average: Math.round(precipitationProbability * 100),
      threshold: {
        wet: 10 // 10mm
      }
    };
  }

  /**
   * Get wind probability data
   */
  async getWindProbability(location, date) {
    const month = new Date(date).getMonth();
    const lat = location.lat;
    
    // Wind patterns based on location and season
    let windyProbability;
    
    if (Math.abs(lat) < 30) { // Low latitudes
      windyProbability = 0.3;
    } else if (Math.abs(lat) < 60) { // Mid latitudes
      windyProbability = 0.5;
    } else { // High latitudes
      windyProbability = 0.7;
    }

    return {
      veryWindy: Math.round(windyProbability * 100),
      calm: Math.round((1 - windyProbability) * 100),
      average: Math.round(windyProbability * 100),
      threshold: {
        windy: 10 // 10 m/s
      }
    };
  }

  /**
   * Get air quality probability data
   */
  async getAirQualityProbability(location, date) {
    // Simple air quality estimation
    const poorQualityProbability = 0.2; // 20% chance of poor air quality
    
    return {
      poor: Math.round(poorQualityProbability * 100),
      good: Math.round((1 - poorQualityProbability) * 100),
      average: Math.round((1 - poorQualityProbability) * 100),
      threshold: {
        poor: 100 // AQI > 100
      }
    };
  }

  /**
   * Get comfort index
   */
  async getComfortIndex(location, date) {
    const temp = await this.getTemperatureProbability(location, date);
    const precip = await this.getPrecipitationProbability(location, date);
    const wind = await this.getWindProbability(location, date);
    const airQuality = await this.getAirQualityProbability(location, date);
    
    // Calculate comfort index (0-100, higher is more comfortable)
    const comfortScore = (
      (100 - temp.veryHot) * 0.3 +
      (100 - precip.veryWet) * 0.3 +
      (100 - wind.veryWindy) * 0.2 +
      (100 - airQuality.poor) * 0.2
    );

    return {
      comfortable: Math.round(comfortScore),
      uncomfortable: Math.round(100 - comfortScore),
      average: Math.round(comfortScore),
      factors: {
        temperature: temp.average,
        precipitation: precip.average,
        wind: wind.average,
        airQuality: airQuality.average
      }
    };
  }

  /**
   * Get historical weather data for analysis
   */
  async getHistoricalData(lat, lng, startDate, endDate, condition) {
    try {
      // This would integrate with actual NASA historical data APIs
      // For now, return simulated data
      const data = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 30)) {
        const dateStr = d.toISOString().split('T')[0];
        const probabilities = await this.getWeatherProbabilities(
          { lat, lng }, 
          dateStr, 
          [condition]
        );
        
        data.push({
          date: dateStr,
          value: probabilities.conditions[condition].average,
          details: probabilities.conditions[condition]
        });
      }

      return {
        location: { lat, lng },
        condition,
        period: { startDate, endDate },
        data,
        summary: {
          average: Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length),
          min: Math.min(...data.map(item => item.value)),
          max: Math.max(...data.map(item => item.value))
        }
      };

    } catch (error) {
      console.error('Error getting historical data:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }
}

module.exports = new WeatherService();
