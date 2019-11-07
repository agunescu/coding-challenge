const mongoose = require('mongoose');  

const reportSchema = new mongoose.Schema({  
    id: String,
    source: String,
    sourceIdentityId: String,
    reference: {
        referenceId: String,
        referenceType: String,
      },
    state: String,
    payload: {
        source: String,
        reportType: String,
        message: String,
        reportId: String,
        referenceResourceId: String,
        referenceResourceType: String,
    },
    created: Date 
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;