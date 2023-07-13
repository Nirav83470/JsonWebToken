var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var jwt = require('jsonwebtoken')
const user = require('../model/apidemo');
const addproduct = require('../model/addproduct');
// const { verify } = require('jsonwebtoken');

/* GET home page. */
router.post('/', async function (req, res, next) {

   var data = await user.create(req.body);

   res.status(200).json({
      status: "Success",
      data,
   })

});

router.post('/product', async function (req, res, next) {

   var add = await addproduct.create(req.body);
   var token = jwt.sign({ _id:add._id }, 'cdmi')



   res.status(200).json({
      status: "Success",
      add,
      token
   })

});


function check_fuc(req, res, next) {
   jwt.verify(req.headers.Authorization, 'cdmi', next);
}


router.get('/getproduct',  async function (req, res, next) {

   var finddata = await addproduct.find();

   var total = finddata.length;
   var skip = await addproduct.find().skip(4).count();
   var limit = await addproduct.find().limit(3).count();


   res.status(200).json({
      status: "Get_All_Product",
      finddata,
      total,
      skip,
      limit,

   })

});

router.get('/gettoone', check_fuc, async function (req, res, next) {
   var find_One = await addproduct.findOne();

   res.status(200).json({
      status: "Find_One_Product",
      find_One,
   
   })

});

router.get('/find_by_src/:page', async function (req, res, next) {
   var srcqury = req.query;
   var product = await addproduct.find(srcqury);
   var total = addproduct.length;
   var page = req.params.page;
   var limit = 3;


   var skipss = (page - 1) * limit;
   var skip = await addproduct.find().skip(skipss).limit(limit).count();
   // var limit = await addproduct.find().skip(0).count();

   res.status(200).json({
      status: "Find_One_Product",
      product,
      total,
      skipss,

      // limit
   })

});



router.get('/addcart', check_fuc, async function (req, res, next) {

   var add = await addproduct.findOne();

   res.status(200).json({
      status: "Find_Add_Card",
      add,
      
   })

});


router.get('/addcart', async function (req, res, next) {

   var add = await addproduct.findOne();

   res.status(200).json({
      status: "Find_Add_Card",
      add,
   })

});


// all card data
router.get('/update',  async function (req, res, next) {

   var update = await addproduct.findOne();

   res.status(200).json({
      status: "Find_Add_Card",
      update,
   })

});

// delet data

router.get('/delet', async function (req, res, next) {

   var del = req.query;
   var delet = await addproduct.deleteOne(del);

   res.status(200).json({
      status: "Delet_One_Data",
      delet,
   })

});





module.exports = router;
