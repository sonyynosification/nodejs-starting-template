/**
 * Created by vtruong8 on 16/01/2017.
 */

var config = require('./config.js');

var dbconn ={};

if (config.db.mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    console.log("Looking for process env for db ...")
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']

    mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        config.db.mongoURLLabel = config.db.mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            config.db.mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        config.db.mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        config.db.mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

    }
}

dbconn.db = null;
dbconn.dbDetails = new Object();

dbconn.initDb = function(callback) {
    if (config.db.mongoURL == null) return;

    var mongodb = require('mongodb');
    if (mongodb == null) return;

    mongodb.connect(config.db.mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        dbconn.db = conn;
        dbconn.dbDetails.databaseName = dbconn.db.databaseName;
        dbconn.dbDetails.url = config.db.mongoURL;
        dbconn.dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', config.db.mongoURL);
    });
};

dbconn.initDb(function(err){
    console.log('Error connecting to Mongo. Message:\n'+err);
});

module.exports = dbconn;