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
const appPassWord = 'zqgdslkmdwbevwpt';


module.exports = { ytBaseURL, ApiKey, trendingParams, apiFormat, connectionUrl, appPassWord };
