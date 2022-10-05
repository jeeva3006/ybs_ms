const { createPool, createConnection } = require('mysql');

class Db {
    constructor() {
        this.pool = null;
    }

    start() {
        this.pool = createPool({
            host: '127.0.0.1',
            user: 'root',
            password: 'awdsawds',
            database: 'youtube',
        });

        console.log(this.pool);

        // this.pool = createPool({
        //     host: '43.205.237.248',
        //     user: 'jeeva',
        //     password: 'jjstyles@',
        //     database: 'youtube',
        //     connectionLimit: 10,
        // });

        return this.pool;
    };

    stop() {
        this.pool.end(function (err) {
            if (err) console.log(err);
        });
    };

    async execute(sql, params) {
        this.pool.query('select * from Title', (err, res) => console.log(res));

        // console.log('a', a);

        // return new Promise((resolve, reject) => {
        //     this.pool.query(sql, params, (err, results) => {
        //         // if (err) return reject(err);
        //         // else return resolve(results);

        //         if (err) console.log(err);
        //         else console.log(results);
        //     });
        // });

    }
}

module.exports = Db;
