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
        message = "Deleted a singer!"
        const delID = req.params.id;          
        checkArray(delID,message);    
        Singer.deleteSinger(delID);        
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    } catch (error) {
        message = error.message;
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    }
})

app.post('/home/edit/:id',(req,res)=>{
    try {
        message = "Edited a singer!"
        const editID = req.params.id;
        checkArray(editID,message);    
        const {name,profile,avatar} = req.body;
        Singer.editSinger(editID,name,profile,avatar);        
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    } catch (error) {
        message = error.message;
        res.render('home',{arraySinger,profileLink,avatarLink,message});
    }
})

function checkArray(id,str){
    let index = arraySinger.findIndex(x=>x._id == id);
    if(index >=0){
        message = str;
    }else{
        message = "Not found ID"
    }
}
