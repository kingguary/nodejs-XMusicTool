const {Spider} = require('./spider/Spider');
const {DBManager} = require('./db/DBManager');

function dbOpenCallback(dbManager) {
    // dbManager.deleteAll();
    let rooDirs = ['E:\\BaiduYunDownload'];
    let spider = new Spider(rooDirs, dbManager);
    spider.begin();
}

let db = new DBManager();
db.connectDB(dbOpenCallback.bind(this));
