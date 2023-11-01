const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialMediaDB", {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialMediaDB', {
    useNewUrlParser: true, // use the new parser
    useUnifiedTopology: true, // use the new topology engine
    
}  );


////////////// export the connection /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.connection;