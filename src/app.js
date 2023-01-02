const express = require('express');
const path = require('path');


const app = express();

// app.set("view engine","ejs");
// app.set("views",path.join(__dirname, "templates"));
// app.use(express.static(path.join(__dirname,'public')));

app.all('*',(req,res,next)=>{
    console.log(req.path);
    console.log(req.query)
    console.log(path.join(__dirname,'public').toString());
    next();
})



app.get('/',(req,res)=>{
    res.send('To jest tekst');
})

app.listen(4580);
