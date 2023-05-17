const { connect, connection } = require('mongoose');

//mongoose DB name social_network_DB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_DB';

//MongoDB connection to social_network_DB database.
connect(connectionString);

module.exports = connection;
