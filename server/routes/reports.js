const express = require('express');
const router = express.Router();

const Report = require('../models/report');

router.get('/', (req, res, next) => {
    Report.find()
        .exec()
        .then(reports => {
            res.status(200).json(reports);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put('/:reportId', (req, res, next) => {
    const id = req.params.reportId;
    const state = req.body.ticketState;

    Report.updateMany({ "payload.reportId" : id }, { state })
        .exec()
        .then(data => {
            if (data.n === 0) {
                return res.status(404).json({
                  message: "Report not found"
                });
            }
            res.status(200).json({
                data,
                message: `Updated ${data.n} reports with id: ${id}`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put('/block/:reportId', (req, res, next) => {
    const id = req.params.reportId;
    const state = req.body.ticketState;

    Report.updateMany({ "payload.reportId" : id }, { state })
        .exec()
        .then(data => {
            if (data.n === 0) {
                return res.status(404).json({
                  message: "Report not found"
                });
            }
            res.status(200).json({ 
                data,
                message: `Blocked ${data.n} reports with id: ${id}`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;