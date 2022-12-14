
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { apiFormat } = require('../constant');
const { insertVideo, getVideoIds, insertDescription, deleteTrendingTable, setTrending } = require('../database/sql/quries/quries');
const { failure, success } = require('../helper/chalk');
class Youtube {
    constructor() {
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
        let existVideoCount = 0;

        const existingVideos = await this.db.execute(getVideoIds);
        await this.db.execute(deleteTrendingTable);

        const existingIds = existingVideos && existingVideos.length > 0 ? existingVideos.map(e => e.videoId) : [];

        for (const video of videos) {
            const { videoId, channelId, thumbnail, title, description, tags, duration, channelTitle,
                viewCount, likeCount, commentCount, dimension, definition, publishedAt, createdBy,
                createdAt, isPublished
            } = video;

            videoCount = videoCount + 1;

            const id = uuid();
            await this.db.execute(setTrending, [[id, videoId, moment.utc().format()]]);

            if (existingIds.indexOf(videoId) < 0) {

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

                success(`${videoCount}) ${video.title} added.`);
                result.push({ thumbnail, videoUrl: `https://www.youtube.com/watch?v=${videoId}`, title, channelTitle });
            } else {
                existVideoCount = existVideoCount + 1;
                failure(`${existVideoCount}) ${title}`);
            }
        }

        return result;
    };
}

module.exports = Youtube;