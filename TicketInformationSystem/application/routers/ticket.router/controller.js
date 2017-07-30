"use strict"

var configFile = require("../../../config");

class TicketController {
    constructor(data) {
        this.data = data;
    }

    getTicket(req, res) {
        // if(!req.isAuthenticated()) {
        //     return res.status(401).redirect("/unauthorized");
        // }
        var currentId = req.query.id;
        if (!currentId) {
            return res.render("ticket/get-ticket", { issueMessage: "Ticket doesn`t exist" });
        }
        this.data.tickets.findById(currentId)
            .then((dbTicket) => {
                if (!dbTicket) {
                    return res.render("ticket/get-ticket", { issueMessage: "Ticket doesn`t exist" });
                }
                return res.render("ticket/get-ticket", { ticket: dbTicket });
            }).catch((err) => {
                req.flash("error", err);
            });
    }

    getTickets(req, res) {
        // if(!req.isAuthenticated()) {
        //     return res.status(401).redirect("/unauthorized");
        // }
        this.data.tickets.getAll()
            .then((dbTickets) => {
                // for (var ind in dbTickets) {
                //     dbTickets[ind].ticketCreateDate = moment(dbTickets[ind].ticketCreateDate).format('L LTS');
                //     dbTickets[ind].ticketLastChangeDate = moment(dbTickets[ind].ticketLastChangeDate).format('L LTS');
                // }

                return res.render("ticket/get-tickets", { tickets: dbTickets });
            }).catch((err) => {
                req.flash("error", err);
            });
    }
}

const init = (data) => {
    return new TicketController(data);
};

module.exports = { init };