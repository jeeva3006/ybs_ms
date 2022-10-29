const insertVideo = `INSERT INTO videos VALUES (?);`;
const getVideoIds = `select videoId from videos`;
const insertDescription = `INSERT INTO description VALUES (?);`;
// const getVideosToPost = `select * from videos where isPublished is false order by publishedAt;`;
const getVideosToPost = `select v.*, d.description, d.tags from videos v, description d where v.id = d.id and v.isPublished is false order by v.publishedAt;`;

module.exports = { insertVideo, getVideoIds, insertDescription, getVideosToPost };
