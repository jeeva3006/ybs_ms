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

router.get('/video/count', async (req, res) => {
    try {
        const published = await db.execute(query.getPublishedCount);
        const pending = await db.execute(query.getPendingCount);

        const key = 'videoId';
        const publishedCount = [...new Map(published.map(item => [item[key], item])).values()].length;
        const pendingCount = [...new Map(pending.map(item => [item[key], item])).values()].length;

        res.send({ publishedCount, pendingCount });
    } catch (error) {
        console.log("error");
    }
});

router.put('/videos', async (req, res) => {
    try {
        const updateVideos = await db.execute(query.setIsPublished, req.body.id);
        const setPostDetails = await db.execute(query.setPostDetails, [Object.values(req.body)]);

        res.send({ updateVideos, setPostDetails });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;