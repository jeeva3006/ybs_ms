
const Web = require('../web');
const youtube = require('../core/youtube');
const { ytBaseURL, trendingParams } = require('../constant');
const { failure } = require('../helper/chalk');
class Youtube extends youtube {
    constructor() {
        super();
        this.web = new Web();
    }

    getTodaysTrending = async () => {
        const { items = [] } = await this.web.get(ytBaseURL, trendingParams);
        return this.getDetails(items);
    };

    setTodaysTrending = async (db, videos) => {
        if (videos && videos.length > 0) return this.setDetails(db, videos);
        else failure("No videos to set.");

        return [];
    };
}

module.exports = Youtube;
