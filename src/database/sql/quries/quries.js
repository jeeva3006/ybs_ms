const insertVideo = `INSERT INTO videos VALUES (?);`;
const getVideoIds = `select videoId from videos`;
const insertDescription = `INSERT INTO description VALUES (?);`;
const getVideosToPost = `select v.*, d.description, d.tags from videos v, description d where v.id = d.id and v.isPublished is false order by v.publishedAt desc;`;
const setPostDetails = `insert into postDetails values (?);`;
const setIsPublished = `update videos set isPublished = true where id = ?;`;
const getPublishedCount = `select videoId from videos where isPublished = true;`;
const getPendingCount = `select videoId from videos where isPublished = false;`;

module.exports = { insertVideo, getVideoIds, insertDescription, getVideosToPost, setPostDetails, setIsPublished, getPendingCount, getPublishedCount };
