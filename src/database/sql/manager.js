const { createPool, createConnection } = require('mysql2');
const { config } = require('../../constant');
class Db {
    constructor() {
        this.pool = null;
    }

    start() {

        this.pool = createConnection(config);

        // this.pool = createPool(config);
        console.log(`Database connected at ${config.host}`);
        return this.pool;
    };

    execute(query, params) {
        console.log(params);
        return new Promise((resolve, reject) => {
            this.pool.query(query, params, (err, results) => {
                if (err) return reject(err);
                else return resolve(results);
            });
        });
    }

    async call(procedureName, params) {
        const opt = (params || []).map(() => { return '?'; });
        return await this.execute(`CALL ${procedureName.replace(';', '')}(${opt.join(',')});`, params);
    }

    end() {
        this.pool.end(function (err) {
            if (err) {
                return console.log(err.message);
            }
            return console.log("Connection destroyed...");
        });
    }
}

module.exports = Db;
