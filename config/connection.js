const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialMediaDB", {
mongoose.connect( 'mongodb://localhost/socialMediaDB');

////////////// export the connection /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.connection;