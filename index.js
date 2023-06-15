const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
let bodyParser =require("body-parser");



let mongoose;
try{
  mongoose = require("mongoose");
  
} catch(e){
  console.log(e);
}

//Mongoose setup
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,
  useUnifiedTopology: true}); 

const Schema = mongoose.Schema

//user schema
const userSchema = new Schema({
  username:{type:String,required:true}
})
const userModel = mongoose.model("user",userSchema)

//exercise schema
const exerciseSchema = new Schema({
  userId:{type:String,required:true},
  description:{type:String,required:true},
  duration: {type:Number,required:true},
  date:{type:Date,default:new Date()},
  
})
let exerciseModel = mongoose.model('exercise',exerciseSchema);






app.use(cors())
app.use(express.static('public'))
app.use("/",bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//create a new user
app.post("/api/users",(req,res)=>{
  const username=req.body.username
  const newUser = userModel({
    username:username
  })
  newUser.save();
  res.json(newUser);
})

app.get('/api/users',async (req,res) => {
 await userModel.find({}).then((users) => {
    res.json(users);
  })
})

app.post('/api/users/:_id/exercises',(req,res)=>{
  console.log
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
