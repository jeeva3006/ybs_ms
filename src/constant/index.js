// Youtube
const ytBaseURL = 'https://youtube.googleapis.com/youtube/v3/videos';
const ApiKey = 'AIzaSyDg08trhS610R1VeeJp4hyGMaBryjKS_3s';
const trendingParams = {
    maxResults: 50,
    regionCode: 'IN',
    videoCategoryId: 10,
    chart: 'mostPopular',
    part: 'snippet,contentDetails,statistics,status',
    key: ApiKey,
};


// Date and Time
const apiFormat = "DD MMM YYYY hh:mm:ss a";


// Database
const connectionUrl = 'mongodb+srv://ybs_ms:QazWsx3%23%23@ybsms.hw71aaq.mongodb.net/?retryWrites=true&w=majority';


//Mailer
// const appPassWord = 'zqgdslkmdwbevwpt';
const appPassWord = 'gdvwnoikbsruways';

// const config = {
//     host: 'sql.freedb.tech',
//     user: 'freedb_qwertyui',
//     password: 'p8J5C9$nWeGXdGZ',
//     port: 3306,
//     database: 'freedb_ybsms_freedb',
//     connectionLimit: 10,
// };

// const config = {
//     host: '127.0.0.1',
//     user: 'ybs',
//     password: 123456789,
//     port: 3307,
//     // database: 'demo',
//     connectionLimit: 10,
// };

const config = {
    host: '43.204.216.190',
    user: 'jeeva',
    password: 'jjstyles@',  // thala DB
    port: 3306,
    database: 'demo',
    connectionLimit: 10,
};

module.exports = { ytBaseURL, ApiKey, trendingParams, apiFormat, connectionUrl, appPassWord, config };
