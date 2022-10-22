const moment = require('moment/moment');
const schedule = require('node-schedule');
const youtube = require('./controller/youtube');
const Mongo = require('./database/mongo/index');
const { apiFormat } = require('./constant');
const Mailer = require('./mailer');
const Db = require('./database/sql/manager');
class ybs extends youtube {
    constructor() {
        super();
        this.scheduleTime = 1;
        this.mongo = new Mongo;
        this.cronRule = `15 * * * * *`;
        this.db = new Db;
    }

    async schedule() {
        console.log("Listening at", this.cronRule);
        this.db.start();
        // const b = await this.db.execute('select * from demo');

        // console.log(b);

        schedule.scheduleJob('todays-trending', this.cronRule, async () => {
            console.log("Schedule started at", moment().format(apiFormat));

            // await this.mongo.start();
            const todaysTrending = await this.getTodaysTrending();
            const insertVideos = await this.setTodaysTrending(this.db, todaysTrending);
            // this.mongo.insertVideos(todaysTrending);

            // setTimeout(() => {

            console.log(insertVideos);
            Mailer(insertVideos);

            if (insertVideos && insertVideos.length === 0)
                console.log(`No videos found on ${moment().format('DD MMM YYYY')}!`);
            // }, [5000]);
        });
    }
};

module.exports = ybs;