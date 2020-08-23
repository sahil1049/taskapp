const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false

})
// mongodb+srv://taskapp:Sahil%40128788_@cluster0.65fas.mongodb.net/test
// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Invalid email")
//             }
//         }
//     },
//     password:{
//   type:String,
//   trim:true,
//   required:true,
//   minlength:7,
//    validate(value){
// if(value.includes('password')){
//     throw new Error("Password cannot contain password string")
// }
//    }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error("Age must be a positive number")
//             }
//         }
//     }
// })
// const me=new User({
//  name:"Mike paul",
//  email:"Gello@hello.com",
//  password:"password123"
 
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })
// const Task=mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })
// const mytask=new Task({
//     description:"task  ",
//     completed:true
  
// })
// mytask.save().then(()=>{
//     console.log(mytask)
// }).catch((error)=>{
//     console.log(error)
// })