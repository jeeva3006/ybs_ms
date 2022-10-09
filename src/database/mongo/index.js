const mongoose = require("mongoose");
const { connectionUrl } = require("../../constant");
const { trendingVideoSchema } = require('./schema');

class Mongo {
    constructor() {
        this.db = null;
        this.insertedVideos = [];
        this.trendingVideos = mongoose.model("TrendingVideos", trendingVideoSchema);
    }

    async start() {
        mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.db = mongoose.connection;
        this.db.on("connected", function () {
            console.log("Database connected successfully!");
        });
    }

    async insertVideos(videos) {
        let insertedVideos = [];

        videos.map((video, index) => {
            this.trendingVideos.find({ videoId: video.videoId }, "title", (err, matchedResult) => {
                if (err) return console.log("Error in searching video");

                if (matchedResult && matchedResult.length === 0) {
                    const newVideo = this.trendingVideos(video);
                    newVideo.save(function (err) {
                        if (err) console.log("Error in saving new video.");
                        else console.log(`${index} ) ${video.title}`);
                    });

                    insertedVideos.push({
                        title: video.title,
                        thumbnail: video.thumbnail,
                        publishedAt: video.publishedAt,
                        channelTitle: video.channelTitle,
                        videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
                        createdAt: video.createdAt,
                    });
                }

                this.insertedVideos = insertedVideos;
            });
        });
    }
}

module.exports = Mongo;