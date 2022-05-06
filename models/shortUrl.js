const mongoose = require('mongoose');
const shortid = require('shortid');
// const baseurl = 'http://localhost:3000/'
// const code = shortid.generate()

const Schema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate
    }
})

module.exports = mongoose.model('ShortUrl', Schema)