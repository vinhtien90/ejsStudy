const app = require("express")();
const bodyParser = require('body-parser');
const {Singer,arraySinger,profileLink,avatarLink} = require('./singer');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.listen(3000);

let message = null;
app.get('/home',(req,res)=>{
    message = null;
    res.render('home',{arraySinger,profileLink,avatarLink,message});
})

app.post('/home',(req,res)=>{
    try {
        const {name,profile,avatar} = req.body;
        let newID = arraySinger.length + 1;
        Singer.addSinger(newID,name,profile,avatar);
        message = "Added new singer!";
    res.render('home',{arraySinger,profileLink,avatarLink,message});
    } catch (error) {
        message = error.message;
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    }
})

app.get('/home/delete/:id',(req,res)=>{
    try {
        const delID = req.params.id;              
        Singer.deleteSinger(delID);
        message = "Deleted a singer!";
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    } catch (error) {
        message = error.message;
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    }
})

app.post('/home/edit/:id',(req,res)=>{
    try {
        const editID = req.params.id;    
        const {name,profile,avatar} = req.body;
        Singer.editSinger(editID,name,profile,avatar);
        message = "Updated a singer!";
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    } catch (error) {
        message = error.message;
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    }
})

