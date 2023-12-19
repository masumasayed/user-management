const mongoose = require('mongoose');
const schema = mongoose.Schema;

let dataScheema = new schema({
    name :{
        type:String,
        required: true
    },
    email:{
        type :String,
        unique:[true,"Email id already present"]
    }
})
//const student = mongoose.model('student', schema)
module.exports = mongoose.model('student', dataScheema)