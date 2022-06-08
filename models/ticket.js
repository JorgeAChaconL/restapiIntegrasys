const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticket = new Schema({
  _id:{
    type:String,
    required:true,
    trim:true
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  device: {
    type: String,
    required: true,
    trim: true,
  },
  charger: {
    type: Boolean,
    required: true,
  },
  accesories: {
    type: Boolean,
    required: true,
  },
  battery: {
    type: Boolean,
    required: true,
  },
  cables: {
    type: Boolean,
    required: true,
  },
  report: {
    type: String,
    required: true,
    trim: true,
  },
  observation: {
    type: String,
    required: true,
    trim: true,
  },
  status:{
    type:Number,
    required:true,
  },
},{
  collection:'Tickets'
});


module.exports = mongoose.model('Ticket',Ticket);
