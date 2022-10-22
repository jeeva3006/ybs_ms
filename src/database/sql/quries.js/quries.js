const insertVideo = `INSERT INTO videos VALUES (?);`;
const getVideoIds = `select videoId from videos`;
const insertDescription = `INSERT INTO description VALUES (?);`;

module.exports = { insertVideo, getVideoIds, insertDescription };
