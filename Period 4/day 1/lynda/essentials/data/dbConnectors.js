import mongoose from 'mongoose'
const CONNECTION = "mongodb+srv://jsUser:lyngbymongo@js-cluster-bny0d.mongodb.net/lynda?retryWrites=true&w=majority"
mongoose.connect(CONNECTION,{useUnifiedTopology:true, useNewUrlParser: true })

const friendSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    gender: {type: String},
    age: {type: Number},
    language: {type: String},
    email: {type: String},
    contacts: {type: Array}
});

const Friends = mongoose.model('friends', friendSchema);

export {Friends}