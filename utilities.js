const log = (text) =>
{
    const date = new Date(Date.now());
    console.log(`\x1b[0m[${date.toUTCString()}] ${text}`)
}

const logError = (text) =>
{
    const date = new Date(Date.now());
    console.log(`\x1b[31m[ERROR]\x1b[0m[${date.toUTCString()}] ${text}`)
}

module.exports.log = log
module.exports.logError = logError