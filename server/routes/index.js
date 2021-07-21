var express = require('express');
var router = express.Router();

const fs = require('fs');


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/',function(req,res){
    fs.readFile('./server/user.json', 'utf8', (error, jsonFile) => {
        res.json(jsonFile);
    })
    
});

router.post("/",function(req,res){
    console.log("Data received.")
    res.writeHead(200,{
        "Content-Type" : "application/json",
    });
    const jsondata = JSON.stringify(req.body);
    fs.writeFileSync('./server/user.json', jsondata);
})

module.exports = router;