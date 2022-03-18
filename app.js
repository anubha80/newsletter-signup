const express= require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const res = require("express/lib/response");
const urlencoded = require("body-parser/lib/types/urlencoded");

const app = express();
app.use(express.static("public"));
app.use(urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName,lastName,email);
})

app.listen(3000, function(){
    console.log("Server is running on 3000");
})