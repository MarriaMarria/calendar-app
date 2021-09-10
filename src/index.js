"use strict"; // in the browser strict mode is guaranteed so it's better to use 
// const server - the same as function app in server.js
const server = require("./server");
const config = require("./config");
const startServer = async () => {
    try {

        // calling a server from server.js to create a server
        const app = await server( config );
        await app.start();

        console.log(`Server running at http://${config.host}:${config.port}`);
    }
    catch(err) {
        console.log("startup error", err);
    }
};

startServer();