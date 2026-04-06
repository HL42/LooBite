/**
 * Artifact Name: CrowdReport.js
 * Description: Domain entity storing real-time crowd level reports.
 * Programmer: Fuquan
 * Date: April 6, 2026
 */

const mongoose = require('mongoose');

const crowdReportSchema = new mongoose.Schema({
  reportId: { type: String, required: true }, // 
  crowdLevel: { type: String, enum: ['Quiet', 'Moderate', 'Busy'] },
  timestamp: { type: Date, default: Date.now } // 
});

module.exports = mongoose.model('CrowdReport', crowdReportSchema);