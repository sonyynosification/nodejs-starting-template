/**
 * Created by vtruong8 on 16/01/2017.
 */

var config = {};

config.port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
config.ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
config.db = {};
config.db.mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db_01';
config.db.mongoURLLabel = "";

module.exports = config;