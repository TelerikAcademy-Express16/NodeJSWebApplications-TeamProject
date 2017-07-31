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
                if (req.isAuthenticated()) {
                    return res.render("ticket/merge-ticket", { 
                        ticket: dbTicket,
                        statuses: configFile.statuses,
                        groups: ["First", "Second"] 
                    });
                } else {
                    return res.render("ticket/get-ticket", { ticket: dbTicket });
                }
            }).catch((err) => {
                req.flash("error", err);
            });
    }

    getTickets(req, res) {
        let authUser;
        if(req.isAuthenticated()) {
            authUser = {};
        }
        this.data.tickets.getAll()
            .then((dbTickets) => {
                // for (var ind in dbTickets) {
                //     dbTickets[ind].ticketCreateDate = moment(dbTickets[ind].ticketCreateDate).format('L LTS');
                //     dbTickets[ind].ticketLastChangeDate = moment(dbTickets[ind].ticketLastChangeDate).format('L LTS');
                // }

                return res.render("ticket/get-tickets", { tickets: dbTickets, authorizedUser: authUser });
            }).catch((err) => {
                req.flash("error", err);
            });
    }

    getMergeTicket(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        var currentId = req.query.id;
        if (currentId) {
            return this.data.tickets.findById(currentId)
                .then((dbTicket) => {
                    return res.render("ticket/merge-ticket", { 
                            ticket: dbTicket,
                            statuses: configFile.statuses,
                            groups: ["First", "Second"] 
                        });
                }).catch((err) => {
                    req.flash("error", err);
                });
        }
        return res.render("ticket/merge-ticket", {
            statuses: configFile.statuses, 
            groups: ["First", "Second"] 
        });
    }

    mergeTicket(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        const bodyUser = req.body;
        console.log(bodyUser);
        return this.data.tickets.merge(bodyUser)
            .then(() => {
                return res.render("ticket/get-tickets");
            });
    }
}

const init = (data) => {
    return new TicketController(data);
};

module.exports = { init };