
function success(txt) {
    return console.log('\x1b[32m%s\x1b[0m', txt);
}

function failure(txt) {
    return console.log('\x1b[31m%s\x1b[0m', txt);
}

function info(txt) {
    return console.log('\x1b[36m%s\x1b[0m', txt);
}

function warning(txt) {
    return console.log('\x1b[33m%s\x1b[0m', txt);
}

module.exports = { success, failure, info, warning };