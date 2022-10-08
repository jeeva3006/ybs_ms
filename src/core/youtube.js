
const moment = require('moment');
const { apiFormat } = require('../constant');
const Mongo = require('../database/mongo');
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
                };
            });
        }

        return data;
    };
}

module.exports = Youtube;