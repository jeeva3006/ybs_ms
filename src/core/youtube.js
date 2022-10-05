
const express = require('express');
const router = express.Router();

class Youtube {

    getDetails = result => {
        let data = {};

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

                const thumbnail = thumbnails ?
                    (thumbnails.maxres ? thumbnails.maxres.url : thumbnails.high.url ? thumbnails.high.url
                        : thumbnails.default.url ? thumbnails.default.url : "") : "";

                return { videoId: item.id, title, description, publishedAt, channelId, channelTitle, thumbnail, tags };
            });
        }

        console.log(data);

        return data;
    };
}

module.exports = Youtube;