const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use((req, res, next)=>{ //middleware
    var now = new Date().toDateString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log+'\n');
    next();
});
// app.use((req,res,next)=>{
//     res.render('errorPage.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear() ;
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
    // res.send('<h1>hello express!</h1>');
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcome:'meri website mai tumhara swagat hai'
    })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'about page',
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'sorry there was an error 404',
    });
});
app.listen(port,()=>{
    console.log(`server is up on port-${port}`);
});