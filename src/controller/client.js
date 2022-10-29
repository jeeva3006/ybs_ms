const express = require('express');
const Db = require('../database/sql/manager');
const router = express.Router();
const query = require('../database/sql/quries/quries');

const db = new Db();
db.start();

router.get('/videos', async (req, res) => {
    try {
        const videos = await db.execute(query.getVideosToPost);
        res.send(videos);
    } catch (error) {
        console.log("error");
    }
});

module.exports = router;