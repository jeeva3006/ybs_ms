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

        videos.map((data, index) => {
            this.trendingVideos.find({ videoId: data.videoId }, "title", (err, matchedResult) => {
                if (err) return console.log("Error in searching video");

                if (matchedResult && matchedResult.length === 0) {
                    const newVideo = this.trendingVideos(data);
                    newVideo.save(function (err) {
                        if (err) console.log("Error in saving new video.");
                        else console.log(`${index} ) ${data.title}`);
                    });

                    insertedVideos.push({
                        title: data.title,
                        thumbnail: data.thumbnail,
                        publishedAt: data.publishedAt,
                        channelTitle: data.channelTitle,
                        videoUrl: `https://www.youtube.com/watch?v=${data.videoId}`,
                        createdAt: data.createdAt,
                    });
                }

                this.insertedVideos = insertedVideos;
            });
        });
    }

}

module.exports = Mongo;