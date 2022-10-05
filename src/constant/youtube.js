const PORT = 2022;

const ytBaseURL = 'https://youtube.googleapis.com/youtube/v3/videos';

const ApiKey = 'AIzaSyDg08trhS610R1VeeJp4hyGMaBryjKS_3s';

const trendingParams = {
    maxResults: 5,
    regionCode: 'IN',
    videoCategoryId: 10,
    chart: 'mostPopular',
    part: 'snippet,contentDetails,statistics,status',
    key: ApiKey,
};

module.exports = { PORT, ytBaseURL, ApiKey, trendingParams };


// export const groupBy = (key) => (array: any[]) =>
//     array.reduce((obj: any, item: any) => {
//         const value = item[key];
//         obj[value] = (obj[value] || []).concat(item);
//         return obj;
//     }, {});
