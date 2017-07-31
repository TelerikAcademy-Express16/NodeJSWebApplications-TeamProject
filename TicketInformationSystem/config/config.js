"use strict"

const port = 1989;
const connectionString = "mongodb://localhost/ticketing-system-db";
const sessionSecret = "The higher the faster";
const userTypes = ["Admin", "Tiket Manager", "Ticket Resolver", "Standard User"];
const statuses = ["Open", "Started", "Resolved"];

module.exports = { 
    port, 
    connectionString, 
    sessionSecret, 
    userTypes, 
    statuses 
};
