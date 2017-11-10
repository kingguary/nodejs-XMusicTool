const mongo = require('mongodb');
const host = '127.0.0.1';
const port = 27017;

const DB_STATE_CLOSED = 0;
const DB_STATE_OPENNING = 1;
const DB_STATE_OPEN = 2;

class DBManager {

    constructor() {
        let server = new mongo.Server(host, port, {auto_reconnect: true});
        this.db = new mongo.Db('music', server);
        this.database = null;
        this.album_collection = null;
        this.callback = null;
        this.dbState = DB_STATE_CLOSED;
    }

    __onCollectionOpened(err, collection) {
        if (err) throw err;
        else {
            this.album_collection = collection;
            this.callback(this);
        }
    }

    __onDbOpened(err, db) {
        if (err) throw err;
        else {
            this.dbState = DB_STATE_OPEN;
            this.database = db;
            console.log('database connected.');
            db.collection('albums', this.__onCollectionOpened.bind(this));
        }
    }

    connectDB(callback) {
        if (this.dbState == DB_STATE_OPENNING) {
            return;
        }

        this.callback = callback;
        this.dbState = DB_STATE_OPENNING;
        this.db.open(this.__onDbOpened.bind(this));
    }

    insertAlbum(album) {
        this.album_collection.insertOne(album, function (err, docs) {
            if (!err) {
                console.log('album insert ok');
            }
        });
    }

    deleteAll() {
        this.album_collection.remove({}, function (err, docs) {
            if (!err) {
                console.log('delete all ok');
            }
        });
    }

    closeDatabase() {
        this.database.on('close', function (err, db) {
            if (err) throw err;
            else {
                console.log('database closed.');
            }
        });
        if (this.dbState == DB_STATE_OPEN) {
            this.database.close();
        }
    }
}

exports.DBManager = DBManager;
