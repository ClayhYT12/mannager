import { Router } from 'express';
import Sequelize from 'sequelize';
import * as tedious from 'tedious';
import { QueryTypes } from 'sequelize';
import db from './db.js'
import  render from 'express';
import bodyParser from 'body-parser';
import SessionController from './controllers/SessionController.js';

const routes = new Router();
let usersall = [];
let numberofuser = 0;

async function GetUsers(){

    const users = await db.query("SELECT * FROM `personas`", { type: QueryTypes.SELECT });

    try {
        console.log(users.length);
        for (let index = 0; index < users.length; index++) {
            if (usersall[index].id) {

            } else {
                usersall.push(users[index]);
                if (numberofuser >= 10) {
                    break;
                }
                numberofuser ++;  
            }
        }

    } catch (err) {
        for (let index = 0; index < users.length; index++) {
            usersall.push(users[index]);
            if (numberofuser >= 10) {
                break;
            }
            numberofuser ++;            
        }      
        console.log(err);
    }

    return usersall;
}

routes.get('/',(req, res) =>{
    GetUsers()
    setTimeout(()=>{
        res.render('index',{
            users:usersall
        });
    },5000);

});

routes.post('/session',SessionController.store)

export default  routes;