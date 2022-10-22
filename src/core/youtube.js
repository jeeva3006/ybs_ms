
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { apiFormat } = require('../constant');
const Mongo = require('../database/mongo');
const { insertVideo, getVideoIds, insertDescription } = require('../database/sql/quries.js/quries');
class Youtube {
    constructor() {
        this.mongo = new Mongo;
    }

    getDetails = result => {
        let data = [];

        if (result && result.length > 0) {
            data = result.map(item => {
                const {
                    title = "",
                    description = "",
                    thumbnails = "",
                    publishedAt = "",
                    channelId = "",
                    channelTitle = "",
                    tags = [] } = item.snippet;

                const thumbnail = thumbnails ? (thumbnails.maxres ? thumbnails.maxres.url : thumbnails.high.url ? thumbnails.high.url : thumbnails.default.url ? thumbnails.default.url : "") : "";

                const {
                    duration = "",
                    dimension = "",
                    definition = "" } = item.contentDetails;

                const {
                    viewCount = "",
                    likeCount = "",
                    commentCount = "" } = item.statistics;


                return {
                    videoId: item.id,
                    channelId,
                    thumbnail,
                    title,
                    description,
                    tags,
                    duration,
                    channelTitle,
                    viewCount,
                    likeCount,
                    commentCount,
                    dimension,
                    definition,
                    publishedAt,
                    createdBy: 'ybsMs',
                    createdAt: moment().format(apiFormat),
                    isPublished: false
                };
            });
        }

        return data;
    };

    setDetails = async (db, videos) => {
        let result = [];
        let videoCount = 0;

        const existingVideos = await this.db.execute(getVideoIds);
        const existingIds = existingVideos && existingVideos.length > 0 ? existingVideos.map(e => e.videoId) : [];

        console.log(existingIds);

        for (const video of videos) {
            const { videoId, channelId, thumbnail, title, description, tags, duration, channelTitle,
                viewCount, likeCount, commentCount, dimension, definition, publishedAt, createdBy,
                createdAt, isPublished
            } = video;

            videoCount = videoCount + 1;

            if (existingIds.indexOf(videoId) < 0) {
                const id = uuid();

                const videoObj = [
                    id,
                    videoId,
                    channelId,
                    thumbnail,
                    title,
                    duration,
                    channelTitle,
                    viewCount,
                    likeCount,
                    commentCount,
                    dimension,
                    definition,
                    publishedAt,
                    createdBy,
                    createdAt,
                    isPublished
                ];

                const descriptionData = [
                    id,
                    description,
                    JSON.stringify(tags)
                ];

                await db.execute(insertDescription, [descriptionData]);
                await db.execute(insertVideo, [videoObj]);

                console.log(`${videoCount}) ${video.title} added.`);
                result.push({ thumbnail, videoUrl: `https://www.youtube.com/watch?v=${videoId}`, title, channelTitle });
            } else {
                console.log(`${title} already present`);
            }
        }

        return result;
    };
}

module.exports = Youtube;