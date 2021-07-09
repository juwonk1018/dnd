var express = require('express');
var router = express.Router();

const fs = require('fs');


router.use(express.json());
router.use(express.urlencoded({ extended: false }));
/*fs.readFile('./src/user.json', 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);
    console.log(jsonFile);

    const jsonData = JSON.parse(jsonFile);
    console.log(jsonFile);

    
}); */

router.get('/',function(req,res){
    fs.readFile('./src/user.json', 'utf8', (error, jsonFile) => {
        res.json(jsonFile);
    })
    
});

router.post("/",async(req,res) => {
    res.writeHead(200,{
        "Content-Type" : "application/json",
    });
    const jsondata = JSON.stringify(req.body);
    fs.writeFileSync('./src/user.json', jsondata);
})

module.exports = router;