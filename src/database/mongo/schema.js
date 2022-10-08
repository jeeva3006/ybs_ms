const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trendingVideoSchema = new Schema({
    videoId: String,
    channelId: String,
    thumbnail: String,
    title: String,
    description: String,
    tags: [String],
    duration: String,
    channelTitle: String,
    viewCount: String,
    likeCount: String,
    commentCount: String,
    dimension: String,
    definition: String,
    publishedAt: String,
    createdBy: String,
    createdAt: String,
});

module.exports = mongoose.model('TrendingVideos', trendingVideoSchema); 