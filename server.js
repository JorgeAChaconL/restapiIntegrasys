const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ticketRoutes = express.Router();
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
require("dotenv").config();
const url = process.env.MONGO_URI;
const Ticket = require('./models/ticket');


const port = 8080;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/tickets',ticketRoutes);

mongoose.connect(url,{useNewUrlParser:true})
const connection = mongoose.connection;


connection.once('open',function(){
  connection.useDb('Integrasys').collection('Tickets');
  console.log(`MongoDB connection established`)
})


ticketRoutes.route('/').get(function(req,res){
  Ticket.find(function(err,tickets){
    if(err){
      console.error(err);
    }else{
      res.json(tickets)
    }
  })
})

ticketRoutes.route('/:id').get(function(req,res){
  let _id = req.params.id
  Ticket.findById(_id,function(err,ticket){
    res.json(ticket)
  });
});

ticketRoutes.route('/add').post(function(req,res){
  let ticket = new Ticket(req.body);
  ticket.save()
        .then(ticket=>{
            res.status(200).json({'ticket':'Ticket added succesfully'});
        })
        .catch(err=>{
          res.status(400).send(`adding new Ticket failed,error: ${err}`);
        })
})

ticketRoutes.route('/update/:id').post(function(req,res){
  Ticket.findById(req.params.id, function(err,ticket){
    if(!ticket)
      res.status(404).send('Ticket not found');
    else
      _id = req.params.id;
      ticket.clientName = req.body.clientName;
      ticket.phoneNumber = req.body.phoneNumber;
      ticket.device = req.body.device;
      ticket.charger = req.body.charger;
      ticket.accesories = req.body.accesories;
      ticket.battery = req.body.battery;
      ticket.cables = req.body.cables;
      ticket.report = req.body.report
      ticket.observation = req.body.observation;
      ticket.status = req.body.status;

      ticket.save().then(ticket =>{
        res.json(`Ticket ${_id} updated` )
      })
      .catch(err =>{
        res.status(400).send(`Ticket not updated, error: ${err}`)
      })
  })
})

// app.get("/api/tickets", (req, res) => {
//   tickets.find(function (err, tickets) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(tickets);
//     }
//   });
// });

// app.get("/api/ticket/:id", (req, res) => {
//   let _id = req.paramsa._id;

//   tickets.findById(_id, function (req, res) {
//     res.json;
//   });
// });

// app.post("/api/ticket", (req, res) => {
//   const _id = req.body._id;
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const device = req.body.device;
//   const ac = req.body.ac;
//   const accs = req.body.accs;
//   const battery = req.body.battery;
//   const report = req.body.report;
//   const observ = req.body.observ;

//   tickets.insertOne(
//     {
//       _id: _id,
//       name: name,
//       phone: phone,
//       device: device,
//       ac: ac,
//       accs: accs,
//       battery: battery,
//       report: report,
//       observ: observ,
//     },
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ err: err });
//         return;
//       }
//       console.log(result);
//       res.status(200).json({ ok: true });
//     }
//   );
// });

// app.put("/api/ticket/:id", (req, res) => {
//   const _id = req.body._id;
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const device = req.body.device;
//   const ac = req.body.ac;
//   const accs = req.body.accs;
//   const battery = req.body.battery;
//   const report = req.body.report;
//   const observ = req.body.observ;

//   tickets
//     .findOneAndUpdate(
//       { _id },
//       {
//         $set: {
//           name: name,
//           phone: phone,
//           device: device,
//           ac: ac,
//           accs: accs,
//           battery: battery,
//           report: report,
//           observ: observ,
//         },
//       },
//       {
//         upsert: true,
//       }
//     )
//     .then((result) => {
//       res.json("Updated");
//     })
//     .catch((error) => console.error(error));
// });

// app.delete("/api/ticket", (req, res) => {
//   tickets
//     .deleteOne({ _id: req.params.id })
//     .then((result) => {
//       res.json("Deleted");
//     })
//     .catch((error) => console.error(error));
// });

// app.post("/api/post", (req, res) => {
//   console.log("Connected to React");
// });

app.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
