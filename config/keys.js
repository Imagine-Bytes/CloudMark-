dbPassword = process.env.MONGODB_URI || 'mongodb://127.0.0.1/cloudmark';

module.exports = {
    mongoURI: dbPassword
};

//+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true'

