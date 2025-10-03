// Simple in-memory cache service
// In production, this would use Redis or similar

class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map(); // Time-to-live tracking
    
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Set a cache entry with TTL
   */
  async set(key, value, ttlSeconds = 3600) {
    try {
      const expiry = Date.now() + (ttlSeconds * 1000);
      this.cache.set(key, JSON.stringify(value));
      this.ttl.set(key, expiry);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * Get a cache entry
   */
  async get(key) {
    try {
      // Check if expired
      const expiry = this.ttl.get(key);
      if (expiry && Date.now() > expiry) {
        this.delete(key);
        return null;
      }

      const value = this.cache.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Delete a cache entry
   */
  async delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
    return true;
  }

  /**
   * Clear all cache entries
   */
  async clear() {
    this.cache.clear();
    this.ttl.clear();
    return true;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      memoryUsage: process.memoryUsage().heapUsed
    };
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, expiry] of this.ttl.entries()) {
      if (now > expiry) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => {
      this.delete(key);
    });

    if (expiredKeys.length > 0) {
      console.log(`Cleaned up ${expiredKeys.length} expired cache entries`);
    }
  }

  /**
   * Check if key exists and is not expired
   */
  async has(key) {
    const expiry = this.ttl.get(key);
    if (expiry && Date.now() > expiry) {
      this.delete(key);
      return false;
    }
    return this.cache.has(key);
  }
}

module.exports = new CacheService();
