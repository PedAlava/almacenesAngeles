const express = require('express')
const response = require('../../network/response')
const controller = require('./../registerUser/controller')
const passport = require('passport');
const router = express.Router()
const {Pool} = require('pg');

const pool = new Pool({
    host: 'db.wpeiyzousnpdyyahxzjm.supabase.co',
    user:'postgres',
    password:'WTKNsdvx2020',
    database: 'postgres',
    port :'5432'
})
var pgSchemas = [];
router.get('/', async function (req, res, next) {
    const user = req.query.user
    const password = req.query.password
    console.log(user)
    console.log(password)
    console.log("ejercicio Response")
    const response = await pool.query('SELECT * FROM "public"."Conversaciones"');//, (err, res) => {
    console.log(response['rows']);
    res.json(response)
    for (let index = 0; index < response['rows'].length; index++) {
      const element = response['rows'][index]['id'];
      console.log(element);
    }
/*
        if (err) {
            console.log("SELECT schema_name:", schemaCodes[err.code]);
            console.log("ERROR code:", err.code);
          } else if (res.rows !== undefined) {
            // Iterate over the rows of Postgres schema names
            res.rows.forEach(row => {
              // Push the schema's name to the array
              pgSchemas.push(row.schema_name);
            });
      
            // Log the number of Postgres schema names to console
            console.log("schema names:", pgSchemas);
            console.log("SELECT schema_name total schemas:", res.rowCount);
          }*/
        pool.end();
    
    

/*
     if (err) {
      console.log("SELECT schema_name:", schemaCodes[err.code]);
      console.log("ERROR code:", err.code);
    } else if (res.rows !== undefined) {
      // Iterate over the rows of Postgres schema names
      res.rows.forEach(row => {
        // Push the schema's name to the array
        pgSchemas.push(row.schema_name);
      });

      // Log the number of Postgres schema names to console
      console.log("schema names:", pgSchemas);
      console.log("SELECT schema_name total schemas:", res.rowCount);
    }
    res.send(pgSchemas)
    console.log("ejercicio Response 2")

    controller.getUser(user,password)
    .then((messageList)=>{
        console.log(messageList)
        response.success(req, res,messageList,200)
        console.log(messageList)
    })
    .catch((error)=>{
        response.error(req, res,'Error',500,error)
    })*/
})

router.post('/', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));




module.exports = router