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
        this.cronRule = `00 05 * * * *`;
    }

    async schedule() {
        console.log("Scheduled for ", this.cronRule);

        schedule.scheduleJob('todays-trending', this.cronRule, async () => {
            console.log("Schedule started at", moment().format(apiFormat));

            await this.mongo.start();
            const todaysTrending = await this.getTodaysTrending();
            this.mongo.insertVideos(todaysTrending);

            setTimeout(() => {
                Mailer(this.mongo.insertedVideos);

                if (this.mongo.insertedVideos && this.mongo.insertedVideos.length === 0)
                    console.log(`No videos found on ${moment().format('DD MMM YYYY')}!`);
            }, [5000]);
        });
    }
};

module.exports = ybs;