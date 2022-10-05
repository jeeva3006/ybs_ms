const axios = require('axios');

class Web {
    constructor() {
        this.scheduleTime = 1;
    }

    get = async (api, params) => {
        try {
            const query = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

            const result = await axios.get(`${api}?${query}`);
            return result.data;
        } catch (error) {
            console.log("API Call Error", error);
        }
    };
};

module.exports = Web;

// https://youtube.googleapis.com/youtube/v3/videos?maxResults:1,regionCode:IN,videoCategoryId:10,chart:mostPopular,part:snippet,contentDetails,statistics,status,key:AIzaSyDg08trhS610R1VeeJp4hyGMaBryjKS_3s