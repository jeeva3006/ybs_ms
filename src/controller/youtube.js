
const Web = require('../web');
const youtube = require('../core/youtube');
const { ytBaseURL, trendingParams } = require('../constant');

class Youtube extends youtube {
    constructor() {
        super();
        this.web = new Web();
    }

    getTodaysTrending = async () => {
        const { items = [] } = await this.web.get(ytBaseURL, trendingParams);
        return this.getDetails(items);
    };
}

module.exports = Youtube;
