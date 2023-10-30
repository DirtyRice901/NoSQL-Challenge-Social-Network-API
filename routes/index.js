////////////// import express router  //////////////
const router = require('express').Router(); 

////////////// import all of the API routes from /api/index.js //////////////
const apiRoutes = require('./api'); 

////////////// use the apiRoutes /////////////////////////////////////////////////////////////////////////////
router.use('/api', apiRoutes); 

////////////// if route is not found, return error 404 //////////////
router.use('/', (req, res) =>{ //
    return res.status(404).send('Wrong route!') 
});

module.exports = router;