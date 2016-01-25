const mongoose = require('mongoose');
const glob = require('glob');

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', console.log);

glob.sync('../models/**.js', { cwd: __dirname }).forEach(require);

module.exports = mongoose;
