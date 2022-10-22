const { createPool } = require('mysql2');
const { config } = require('../../constant');
const { success, failure, warning } = require('../../helper/chalk');
class Db {
    constructor() {
        this.pool = null;
    }

    start() {
        this.pool = createPool(config);
        return success(`Database connected at ${config.host}`);
    };

    execute(query, params) {
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
                return failure(err.message);
            }
            return warning("Connection destroyed...");
        });
    }
}

module.exports = Db;
