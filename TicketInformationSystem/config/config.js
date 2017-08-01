"use strict"

const port = 1989;
const connectionString = "mongodb://localhost/ticketing-system-db";
const sessionSecret = "The higher the faster";
const userTypes = ["Admin", "Tiket Manager", "Ticket Resolver", "Standard User"];
const statuses = ["Open", "Started", "Resolved"];
const groups = ["Hardware IT", "Software IT", "User Setting"];

module.exports = { 
    port, 
    connectionString, 
    sessionSecret, 
    userTypes, 
    statuses,
    groups 
};
