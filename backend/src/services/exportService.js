const fs = require('fs').promises;
const path = require('path');

class ExportService {
  constructor() {
    this.tempDir = path.join(__dirname, '../../temp');
    this.ensureTempDir();
  }

  /**
   * Ensure temp directory exists
   */
  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  /**
   * Generate CSV export
   */
  generateCSV(data) {
    const headers = ['Location', 'Date', 'Condition', 'Probability (%)', 'Threshold'];
    const rows = [headers];

    // Add metadata info
    if (data.metadata) {
      rows.push(['', '', '', '', '']);
      rows.push(['Data Source', data.metadata.dataSource, '', '', '']);
      rows.push(['Generated At', data.metadata.generatedAt, '', '', '']);
      rows.push(['', '', '', '', '']);
    }

    // Add weather data
    const { location, date, conditions } = data;
    
    Object.entries(conditions).forEach(([condition, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === 'number') {
            rows.push([
              `${location.lat}, ${location.lng}`,
              date,
              `${condition}_${key}`,
              value,
              values.threshold?.[key] || ''
            ]);
          }
        });
      }
    });

    return this.arrayToCSV(rows);
  }

  /**
   * Generate JSON export
   */
  generateJSON(data) {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Generate PDF report (simplified version)
   */
  async generatePDFReport(data, options) {
    // For hackathon purposes, we'll return a simple text-based report
    // In production, you'd use a library like Puppeteer or PDFKit
    
    const report = this.generateTextReport(data, options);
    
    // Convert to buffer (simulating PDF)
    return Buffer.from(report, 'utf8');
  }

  /**
   * Generate text report
   */
  generateTextReport(data, options) {
    const { location, date, conditions } = data;
    
    let report = `
WEATHER PROBABILITY REPORT
==========================

Location: ${location.name || `${location.lat}, ${location.lng}`}
Date: ${date}
Generated: ${new Date().toISOString()}

WEATHER CONDITIONS:
-------------------
`;

    Object.entries(conditions).forEach(([condition, values]) => {
      report += `\n${condition.toUpperCase()}:\n`;
      
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === 'number') {
            report += `  ${key}: ${value}%\n`;
          }
        });
        
        if (values.threshold) {
          report += `  Thresholds: ${JSON.stringify(values.threshold)}\n`;
        }
      }
    });

    if (data.metadata) {
      report += `\nMETADATA:\n`;
      report += `Data Source: ${data.metadata.dataSource}\n`;
      report += `Units: ${JSON.stringify(data.metadata.units)}\n`;
    }

    report += `\n--- End of Report ---\n`;
    
    return report;
  }

  /**
   * Generate historical data export
   */
  generateHistoricalCSV(historicalData) {
    const headers = ['Date', 'Value', 'Condition', 'Location'];
    const rows = [headers];

    // Add summary info
    rows.push(['', '', '', '']);
    rows.push(['SUMMARY', '', '', '']);
    rows.push(['Average', historicalData.summary.average, historicalData.condition, '']);
    rows.push(['Minimum', historicalData.summary.min, historicalData.condition, '']);
    rows.push(['Maximum', historicalData.summary.max, historicalData.condition, '']);
    rows.push(['', '', '', '']);

    // Add data points
    historicalData.data.forEach(item => {
      rows.push([
        item.date,
        item.value,
        historicalData.condition,
        `${historicalData.location.lat}, ${historicalData.location.lng}`
      ]);
    });

    return this.arrayToCSV(rows);
  }

  /**
   * Convert array to CSV string
   */
  arrayToCSV(rows) {
    return rows.map(row => 
      row.map(cell => {
        // Escape quotes and wrap in quotes if contains comma or quote
        const cellStr = String(cell || '');
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    ).join('\n');
  }

  /**
   * Generate export based on format
   */
  async generateExport(data, options) {
    const { format, includeMetadata } = options;
    
    if (!includeMetadata) {
      // Remove metadata for cleaner export
      const cleanData = { ...data };
      delete cleanData.metadata;
      data = cleanData;
    }

    switch (format) {
      case 'csv':
        return this.generateCSV(data);
      case 'json':
        return this.generateJSON(data);
      default:
        return this.generateJSON(data);
    }
  }

  /**
   * Generate historical data export
   */
  async generateHistoricalExport(historicalData, options) {
    const { format } = options;

    switch (format) {
      case 'csv':
        return this.generateHistoricalCSV(historicalData);
      case 'json':
        return this.generateJSON(historicalData);
      default:
        return this.generateJSON(historicalData);
    }
  }

  /**
   * Clean up temporary files
   */
  async cleanup() {
    try {
      const files = await fs.readdir(this.tempDir);
      const deletePromises = files.map(file => 
        fs.unlink(path.join(this.tempDir, file))
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

module.exports = new ExportService();
