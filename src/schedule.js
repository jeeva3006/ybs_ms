const moment = require('moment/moment');
const schedule = require('node-schedule');
const Mailer = require('./mailer');
const { failure, info } = require('./helper/chalk');
const Db = require('./database/sql/manager');
const youtube = require('./controller/youtube');
const { apiFormat } = require('./constant');
class ybs extends youtube {
    constructor() {
        super();
        this.db = new Db;
        this.cronRule = `00 10 * * * *`;
    }

    async schedule() {
        info(`Listening at, ${this.cronRule}`);

        schedule.scheduleJob('todays-trending', this.cronRule, async () => {
            this.db.start();
            info(`Schedule started at ${moment().format(apiFormat)}`);

            const todaysTrending = await this.getTodaysTrending();
            const insertVideos = await this.setTodaysTrending(this.db, todaysTrending);

            Mailer(insertVideos);
            if (insertVideos && insertVideos.length === 0) failure(`No videos found on ${moment().format('DD MMM YYYY')}!`);

            setTimeout(() => this.db.end(), [10000]);
        });
    }
};

module.exports = ybs;