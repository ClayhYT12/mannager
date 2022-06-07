import express from 'express';
import routes from'./src/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';

class App{

    constructor(){
        this.server = express();
        this.server.engine('ejs', ejs.renderFile);
        this.server.set('view engine', 'ejs');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.server.use(express.static(path.join(__dirname ,'public')));
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;