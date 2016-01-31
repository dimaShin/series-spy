const mongoose = require('mongoose');
const glob = require('glob');
const dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

mongoose.connect(dbUri);
mongoose.connection.on('error', console.log);

glob.sync('../models/**.js', { cwd: __dirname }).forEach(require);

module.exports = mongoose;
