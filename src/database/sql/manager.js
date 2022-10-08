// const Db = require("./connection");

// class DbManager {

//     constructor() {
//     }

//     execute(query, params) {
//         console.log("first");
//         let values = params;
//         let sql = query;

//         // if (query && params) {
//         //     sql = this.queryFormat(query, params.identifier);
//         //     values = params.hasOwnProperty('values') ? params.values : null;
//         // }

//         console.log(sql);

//         // return new Promise((resolve, reject) => {
//         //     this.conn.query(sql, values, (err, results) => {
//         //         if (err) return reject(err);
//         //         else return resolve(results);
//         //     });
//         // });

//         this.pool.query(sql, values, (err, results) => {
//             if (err) console.log(err);
//             else console.log(results);
//         });

//     }

//     queryFormat(query, values) {
//         if (!values) return query;
//         return query.replace(/\{(\w+)}/g, function (txt, key) {
//             if (values.hasOwnProperty(key)) {
//                 return values[key];
//             }
//             return txt;
//         }.bind(this));
//     };



//     async call(procedureName, params) {
//         const opt = (params || []).map(() => { return '?'; });
//         return this.execute(`CALL ${procedureName.replace(';', '')}(${opt.join(',')});`, params);
//     }
// }

// module.exports = DbManager;