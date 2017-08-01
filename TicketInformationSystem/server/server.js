"use strict"

const async = () => {
    return Promise.resolve();
};

const config = require("../config");
let io = require("socket.io");

const run = () => {
    return async()
        .then(() => require("../db").init(config.connectionString))
        .then((db) => require("../data").init(db))
        .then((data) => require("../application").init(data))
        .then((app) => {
            // io = io(app);
            // io.on("connection", (client) => {
            // });
            
            // io.sockets.on('connection', (client) => {
            //     console.log('io.connection called');
            //     client.on("event", (data) => {});
            //     client.on('updateData', (json, action, id) => {
            //         if (action == "edit" || action == "create") {
            //             console.log('updateData event');
            //         }
            //         updateData(client, json, action, id);
            //     } );
            //     client.on("disconnect", () => {});
            // });
            app.listen(config.port, () =>
                console.log(`Server listening to port: ${config.port}`));
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateData(socket, json, action, id) {
    if (action == "edit" || action == "create") {
        console.log('updateData called');
    }
    socket.broadcast.to('clients').emit('updateData', json, action, id);
}

module.exports = { run };