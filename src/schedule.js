const axios = require('axios');
const moment = require('moment/moment');
const schedule = require('node-schedule');
const youtube = require('./controller/youtube');
const Db = require('./database/connection');
const DbManager = require('./database/manager');

class ybs extends youtube {
    constructor() {
        super();
        this.scheduleTime = 1;
        this.db = new Db;
        // this.conn = new DbManager;
    }

    schedule() {
        console.log("Started at: ", moment().format("DD MMM YYY h:mm:ss a"));

        const cronRule = `*/${this.scheduleTime} * * * *`;

        const startDB = this.db.start();

        // schedule.scheduleJob('todays-trending', cronRule, async () => {
        //     this.getTodaysTrending();
        // });

        console.log(this.db.execute('select * from Title where id = 1'));
        // this.db.stop();
    }
};

module.exports = ybs;