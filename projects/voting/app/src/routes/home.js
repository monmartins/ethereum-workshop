var express = require('express')
var router = express.Router()

module.exports = function (eth) {
  
    /* GET Home Page */
    router.get('/', function (req, res,next) {
      eth.query(req,res,next)
    }) 
    /* Post Home Page */
    router.post('/', function (req, res,next) {
      eth.submitVote(req,res,next)
    }) 


    return router
}