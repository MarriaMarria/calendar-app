"use strict";

module.exports.register = async server => {
    server.route( { 
        method: 'GET',
        path: '/',
        // h = request toolkit, conventionally called h
        handler: async ( request, h ) => {
            return "My first hapi server!";
        }
    });
}