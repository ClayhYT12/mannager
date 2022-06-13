import { Router } from 'express';
import Sequelize from 'sequelize';
import * as tedious from 'tedious';
import { QueryTypes } from 'sequelize';
import db from './db.js'
import  render from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import security from '../public/js/security.js';

let app = new render()
const routes = new Router();
let usersall = [];


async function GetUsers(req,res){

    const users = await db.query("SELECT * FROM personas", { type: QueryTypes.SELECT });

    try {
        console.log(users);
        for (let index = 0; index < users.length; index++) {
            if (usersall[index].id) {

            } else {
                 usersall.push(users[index]);

            }
        }

    } catch (err) {
        for (let index = 0; index < users.length; index++) {
             usersall.push(users[index]);         
        }      
        console.log(err);
    }
    res.render('index',{
        users:usersall
    });

    usersall.length = 0;
    
}

async function GetUser(email,senha,req,res){
    const passwordhash = await db.query("SELECT senha FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
    let confirm = security.CompareHash(senha,passwordhash[0].senha)
    if (confirm === true) {
        const user = await db.query("SELECT email,software,validade,hwid,vendedor FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
        //JSON.stringify(user);
        res.json(user); 
    }
     else {
        
        res.json(400);        
    }

}

async function UpdateUser(email,senha,hwid,software,req,res ){
    const passwordhash = await db.query("SELECT senha FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
    let confirm =  security.CompareHash(senha,passwordhash[0].senha)
    if (confirm === true) {
        try {
            const user = await db.query("SELECT hwid FROM personas WHERE email = '"+email+"' AND software = '"+software+"'", { type: QueryTypes.SELECT });
            console.log(user[0].hwid);
            if(user[0].hwid != ''){
                res.json({"response":"Este campo já existe"});
            }else{
                const update = await db.query("UPDATE personas SET hwid = '"+hwid+"' WHERE email = '"+email+"' AND software = '"+software+"'", { type: QueryTypes.UPDATE });
                const userupdated = await db.query("SELECT * FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
                res.json(userupdated);
            }
        } catch (error) {            
            console.log(error);
            res.json({"erro":"usuario ou senha invalido"});
        }
    } else {
        
    }
        
        
}

async function UpdateAllUser(email,senha,software,validade,hwid,vendedor,req,res){
    const passwordhash = await db.query("SELECT senha FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
    if (senha === passwordhash[0].senha) {      
        try {
            const user = await db.query("SELECT hwid FROM personas WHERE email = '"+email+"' AND senha = '"+senha+"'", { type: QueryTypes.SELECT });
            console.log(user[0].hwid);
            if(user[0].hwid != ''){
                const update = await db.query("UPDATE personas SET email = '"+email+"',senha = '"+passwordhash[0].senha+"',software = '"+software+"',validade = '"+validade+"',hwid = '"+hwid+"',vendedor = '"+vendedor+"' WHERE email = '"+email+"' AND senha = '"+senha+"' ", { type: QueryTypes.UPDATE });
                const userupdated = await db.query("SELECT * FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
                res.json(userupdated);

            }else{
                res.json({"response":"Este campo já existe"});
            }
        } catch (error) {            
            console.log(error);
            res.json({"erro":"usuario ou senha invalido"});
        }
    }
}

async function InserirUser(email,senha,software,validade,hwid,vendedor,req,res){

    if (typeof email === "undefined") {
        const user = await db.query("SELECT * FROM personas", { type: QueryTypes.SELECT });
        //JSON.stringify(user);
        res.json(user);
    } else {
        
        try {
            const user = await db.query("SELECT hwid FROM personas WHERE email = '"+email+"' AND senha = '"+senha+"'", { type: QueryTypes.SELECT });
            console.log(user[0].hwid);
            if(user[0].hwid != ''){
                res.json({"response":"Este usuario já existe"});
            }else{
                res.json({"erro":"erro interno"});
            }
        } catch (error) {            
            const update = await db.query("INSERT INTO personas (email, senha, software, validade, hwid, vendedor) VALUES ('"+email+"','"+senha+"','"+software+"','"+validade+"','"+hwid+"','"+vendedor+"');", { type: QueryTypes.INSERT });               
            res.json({"status":"usuario criado com sucesso"});
        }
    }

}

async function DeleteUser(email,senha,req,res){
    const passwordhash = await db.query("SELECT senha FROM personas WHERE email = '"+email+"'", { type: QueryTypes.SELECT });
    console.log("Aqui " + senha,email,passwordhash[0].senha)
    if (senha === passwordhash[0].senha) {
        try {
            const update = await db.query("DELETE FROM personas WHERE email = '"+email+"'", { type: QueryTypes.DELETE });
            res.json({"status":"Usuario deletado com sucesso"});
            
        } catch (error) {            
            console.log(error);
            res.json({"erro":"usuario ou senha invalido"});
        }
    } else {
        
    }
}

async function Autentication(usuario,password,req,res){
    const user = await db.query("SELECT * FROM usuarios WHERE usuario = '"+usuario+"' AND password = '"+password+"'", { type: QueryTypes.SELECT });
    console.log(usuario,password,user[0]);
    if (user[0].password == password) {
        req.session.login = usuario;
        GetUsers(req,res);
    } else {
        res.render('login');
    }    
}

routes.post('/',(req, res) =>{
    Autentication(req.body.email,req.body.senha,req,res);
});    

routes.get('/',(req, res) =>{
    if (req.session.login) {
        GetUsers(req,res);
    } else {
        res.render('login')
    }
});

routes.get('/panel/:email',(req, res) =>{
    GetUsers()
    setTimeout(()=>{
        res.render('index',{
            users:usersall
        });
    },5000);

});

routes.post('/create/user',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.body;
    let { email } = req.body;
    let { software } = req.body;
    let { validade } = req.body;
    let { hwid } = req.body;
    let { vendedor } = req.body;
    let passwordhash = security.Generatehash(senha);
    InserirUser(email,passwordhash,software,validade,hwid,vendedor,req,res);
   
})

routes.post('/updateall/user',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.body;
    let { email } = req.body;
    let { software } = req.body;
    let { validade } = req.body;
    let { hwid } = req.body;
    let { vendedor } = req.body;
    UpdateAllUser(email,senha,software,validade,hwid,vendedor,req,res);
    
})

routes.get('/list/user/:email/:senha',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.params;
    let { email } = req.params;
    GetUser(email,senha,req,res);
})

routes.get('/list/user',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.body;
    let { email } = "";
    let { software } = req.body;
    let { validade } = req.body;
    let { hwid } = req.body;
    let { vendedor } = req.body;
    //GetUser(email,req,res);
    res.json({"erro":"não permitido"})
})

routes.get('/update/user/:email/:senha/:hwid/:software',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.params;
    let { email } = req.params;
    let { hwid } = req.params;
    let { software } = req.params;
    UpdateUser(email,senha,hwid,software,req,res);
})

routes.post('/delete/user',(req,res)=>{
    //nombre,email,software,validade,hwid,vendedor
    let { senha } = req.body;
    let { email } = req.body;
    console.log(email,senha)
    DeleteUser(email,senha,req,res);
})


export default  routes;