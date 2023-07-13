const mongoose = require('mongoose');

//ENVIRONMENT VARIABLES
require('dotenv').config();


const DB = `mongodb+srv://enrique:hsVhHufnDZTuAVoF@learningcluster.xlfnt.mongodb.net/msn?retryWrites=true&w=majority`
mongoose.connect(DB, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
})






