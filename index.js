const app = require("express")();
const bodyParser = require('body-parser');
const {Singer,arraySinger,profileLink,avatarLink} = require('./singer')
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.listen(3000);

app.get('/home',(req,res)=>{
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.post('/home',(req,res)=>{
    const {name,profile,avatar} = req.body;
    let newID = arraySinger.length + 1;
    let newSinger = new Singer();
    newSinger._id = newID;
    newSinger.name = name;
    newSinger.profile = profile;
    newSinger.avatar = avatar;
    arraySinger.push(newSinger);
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.get('/home/delete/:id',(req,res)=>{
    const delID = req.params.id;
    arraySinger.forEach(element => {
        if (element._id == delID) {
            arraySinger.pop(element);
        }
    });
    res.render('home',{arraySinger,profileLink,avatarLink});
})

app.post('/home/edit/:id',(req,res)=>{
    const editID = req.params.id;
    let index = parseInt(editID) - 1;
    const {name,profile,avatar} = req.body;
    let singer = arraySinger.find(value => value._id == editID);
    singer.name = name;
    singer.link = profile;
    singer.avatar = avatar;
    arraySinger[index] = singer;
    res.render('home',{arraySinger,profileLink,avatarLink});
})

