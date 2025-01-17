const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    reportId: String,
    reportedOrg: String,
    reporter: String,
    reason: String,
    description: String,
    image: String,
    status: String,
    response: String,
    dateReported: Date,
})

const ReportModel = mongoose.model('reports', ReportSchema)
module.exports = ReportModel