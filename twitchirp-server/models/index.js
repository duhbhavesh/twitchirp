const mongoose = require("mongoose");
mongoose.set("debug", true);  //usefull to see mongo query that are run in terminal
mongoose.Promise = Promise;   //used because of es6 async functions
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twitchirp", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.User = require("./user");
module.exports.Message = require("./message");