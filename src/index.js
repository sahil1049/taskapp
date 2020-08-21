const express=require('express')
require('./db/mongoose')

const user_router=require('../src/routers/user')
const task_router=require('../src/routers/task')
const app=express()

const port=process.env.PORT 
const multer=require('multer')
const upload=multer({
    dest:'files',
    limits:{
      fileSize:1000000
      
    },
    fileFilter(req,file,cb){
        // cb(new Error("file must be a pdf"))
        if(!file.originalname.match(/\.(doc|docx)$/)){
          return cb(new Error("upload a word document"))
        }
   cb(undefined,true)

    }
})
const errorMiddleware=(req,res)=>{
    throw new Error("midleware error")
}
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
// app.use((req,res,next)=>{
// // console.log(req.method,req.path)
// // next()
// // if(req.method=='GET'){
// // res.send('GET requests disabled')
// // }
// // else{
// //     next()
// // }
// // res.status(503).send('SITE UNDER MAINTAINENCE')
// })
app.use(express.json())
app.use(user_router)
app.use(task_router)

const router=new express.Router()

// app.post('/users',(req,res)=>{
//     console.log(req.body)
// res.send("Testing")
// })



app.listen(port,()=>{
    console.log("SERVER IS UP ON PORT",port)
})
// const jwt=require('jsonwebtoken')
// const bcrypt=require('bcryptjs')
// const myFunction=async()=>{

//     const plainPass="sahil1234"
//     const hashedPass=await bcrypt.hash("plainPass",8)

//     const ismatch=await bcrypt.compare(plainPass,hashedPass)
//     console.log(plainPass)
//     console.log(hashedPass)
//     console.log(ismatch)
//     const token=jwt.sign({_id:'394u35'},'secret',{expiresIn:'10 seconds'})
//     console.log(token)

//     const data=jwt.verify(token,'secret')
//     console.log(data)  
    
//     const a=new Promise((res,rej)=>{
//         setTimeout(()=>{
//           console.log('late')
//         },2000)
       
//     })
    
//     const x=await a
    

// }
// myFunction()


// const pet={
//   name:"sahil"
// }
// pet.toJSON=function(){

//   return {}
// }
// console.log(JSON.stringify(pet))

// const Task=require('./models/task')
// const User =require('./models/user')
// const t=async()=>{
    // const task=await Task.findById('5f1985256ff07722543b4547');
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
//     const user=await User.findById('5f1fd96a1a6f9504a833f402')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }
// t();