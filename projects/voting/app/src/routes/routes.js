var express = require('express');
var router = express.Router();

module.exports = function (eth) {
	var home = require('./home')(eth);
	
    router.get('/',(req, res, next) => {
			res.redirect('/home')
			next();
		}
	);
	/* GET Home Page */
	router.use('/home', home);

    return router
}