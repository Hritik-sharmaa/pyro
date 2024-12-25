const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gameId:{
        type: Number,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    system_requirements:{
        type: Object,
        required: false
    },
    rating: { type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    publisher: [{
        type: String,
        required: false,
    }],
    released: {
        type: Date,
        required: true,
    },
    genres: [{
        type:String,
    }],
    tags: [{
        type: String,
    }],
    screenshots:[{
        type:String,
        default:[],
    }],
    trailer:{
        type:String,
        required: false,
    },
    poster:{
        type:String,
        required: true,
    },

});

module.exports = mongoose.model("Game", GameSchema);