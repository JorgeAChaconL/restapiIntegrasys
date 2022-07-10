const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ticketRoutes = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URI;
const Ticket = require("./models/ticket");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use("/tickets", ticketRoutes);

mongoose.Promise = global.Promise;
mongoose.connect(url, { 
  useNewUrlParser: true 
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log(`MongoDB connection established`);
});

ticketRoutes.route("/").get(function (req, res) {
  Ticket.find(function (err, tickets) {
    if (err) {
      console.error(err);
    } else {
      res.json(tickets);
    }
  });
});

ticketRoutes.route("/:id").get(function (req, res) {
  let _id = req.params.id;
  Ticket.findById(_id, function (err, ticket) {
    res.json(ticket);
  });
});

ticketRoutes.route("/add").post(function (req, res) {
  let ticket = new Ticket(req.body);
  ticket
    .save()
    .then((ticket) => {
      res.status(200).json({ ticket: "Ticket added succesfully" });
    })
    .catch((err) => {
      res.status(400).send(`adding new Ticket failed,error: ${err}`);
    });
});

ticketRoutes.route("/update/:id").post(function (req, res) {
  let ticket = new Ticket(req.body);
  Ticket.findById(req.params.id, function (err, ticket) {
    if (!ticket) res.status(404).send("Ticket not found");
    else _id = req.params.id;
    ticket.ticket_clientName = req.body.clientName;
    ticket.ticket_phoneNumber = req.body.phoneNumber;
    ticket.ticket_device = req.body.device;
    ticket.ticket_charger = req.body.charger;
    ticket.ticket_accesories = req.body.accesories;
    ticket.ticket_battery = req.body.battery;
    ticket.ticket_cables = req.body.cables;
    ticket.ticket_report = req.body.report;
    ticket.ticket_observation = req.body.observation;
    ticket.ticket_status = req.body.status;

    ticket
      .save()
      .then((ticket) => {
        res.json(`Ticket ${_id} updated`);
      })
      .catch((err) => {
        res.status(400).send(`Ticket not updated, error: ${err}`);
      });
  });
});

app.listen(process.env.PORT || 5000);
