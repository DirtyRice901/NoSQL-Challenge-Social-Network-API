const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialMediaDB", {
mongoose.connect( 'mongodb://localhost:27017/socialMediaDB');

////////////// export the connection /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.connection;