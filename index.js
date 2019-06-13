const app = require("express")();
const bodyParser = require('body-parser');
const {Singer,arraySinger,profileLink,avatarLink} = require('./singer');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.listen(3000);

app.get('/home',(req,res)=>{
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.post('/home',(req,res)=>{
    const {name,profile,avatar} = req.body;
    let newID = arraySinger.length + 1;
    Singer.addSinger(newID,name,profile,avatar);
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.get('/home/delete/:id',(req,res)=>{
    const delID = req.params.id;
    Singer.deleteSinger(delID);
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.post('/home/edit/:id',(req,res)=>{
    const editID = req.params.id;    
    const {name,profile,avatar} = req.body;
    Singer.editSinger(editID,name,profile,avatar);
    res.render('home',{arraySinger,profileLink,avatarLink});
})

