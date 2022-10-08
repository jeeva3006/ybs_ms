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
            console.log("GET ERROR!", error);
        }
    };
};

module.exports = Web;