const mongoose = require('mongoose');

// Mongo database that acts as an in-memory database
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoMemoryServer = new MongoMemoryServer();;

const DB_URI = 'mongodb://localhost:27017/mycardealership'

// connect to the database
function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            mongoMemoryServer.getUri()
                .then((res) => {
                    mongoose.connect(res, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
                })
        } else {
            mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        }
    })
}

// disconnect from the database
function disconnect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            mongoMemoryServer.stop();
        }
        mongoose.disconnect()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
        })
}

module.exports = { connect, disconnect };