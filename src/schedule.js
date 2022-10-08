const moment = require('moment/moment');
const schedule = require('node-schedule');
const youtube = require('./controller/youtube');
const Mongo = require('./database/mongo/index');
const { apiFormat } = require('./constant');
const Mailer = require('./mailer');
class ybs extends youtube {
    constructor() {
        super();
        this.scheduleTime = 1;
        this.mongo = new Mongo;
        this.cronRule = `15 * * * * *`;
    }

    async schedule() {
        console.log("Started at", moment().format(apiFormat));

        // this.mongo.setTrending();

        this.mongo.start();

        schedule.scheduleJob('todays-trending', this.cronRule, async () => {
            const todaysTrending = await this.getTodaysTrending();
            await this.mongo.insertVideos(todaysTrending);

            setTimeout(() => {
                Mailer(this.mongo.insertedVideos);
            }, [3000]);
        });
    }
};

module.exports = ybs;