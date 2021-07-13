var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/' , function(req, res){
    res.render("index");
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xyz@gmail.com',
      pass: 'pass' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  
app.post('/',function(req, res){
    var message = req.body.message;
    const mailOptions = {
        from: 'xyz@gmail.com',
        to: 'abc@gmail.com',
        subject: 'SaySomething',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.redirect('/');
});
app.listen(process.env.PORT ||5500, function(){
    console.log("server running...");
});