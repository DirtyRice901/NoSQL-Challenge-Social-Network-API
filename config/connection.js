const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


////////////// export the connection /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.connection;