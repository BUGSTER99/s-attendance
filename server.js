const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
const PORT = process.env.PORT || 3000;
app.use(express.json()); // this is the body parser
connectDb();

nextApp.prepare().then(()=>{
    app.use('/api/auth', require('./api/auth'));
    app.use('/api/user', require('./api/user'));
    app.use('/api/kartu', require('./api/kartu'));
    app.use('/api/attendance', require('./api/attendance'));
    app.all("*",(req,res) => handle(req,res));
});

server.listen(PORT,err=>{
    if(err) throw err;
    console.log(`Express Server running on ${PORT}`);
});