const express= require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const res = require("express/lib/response");
const urlencoded = require("body-parser/lib/types/urlencoded");
const https = require("https");
const { options } = require("request");

const app = express();
app.use(express.static("public"));
app.use(urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName,lastName,email);
    const data = {
        members : [
            {
                email_address : email, 
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data); 
    const url="https://us14.api.mailchimp.com/3.0/lists/d0ab4fb927";
    const options = {
        method : "POST",
        auth : "anubhadubey:0bae344b818b7e92bbedeafa301fc02c-us14"
    }
    const request = https.request(url,options,function(response){
        response.on("data", function(data){
            // console.log(JSON.parse(data));
            // console.log(response.statusCode);
            if (response.statusCode===200){
                //console.log("yay!");
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen(3000, function(){
    console.log("Server is running on 3000");
})


//API key 
// 0bae344b818b7e92bbedeafa301fc02c-us14

// Audience id or list id
// d0ab4fb927