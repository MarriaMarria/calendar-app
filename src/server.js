"use strict";

// 1. Require Hapi
const Hapi = require("@hapi/hapi");
const routes = require("./routes"); 

const app = async config => {
    const { host, port } = config; // dividing (destructuring) config object in variables host and port

    // 2. initialize a new hapi.server
    // with connection details containing a 
    // port number and the host info 

    const server = Hapi.server( { host, port } ); // could do ( config ) 
    
    server.app.config = config; // we gonna store the config values on server.app instance and we can access it from anywhere else

    await routes.register( server );
    return server;
};

module.exports = app;
