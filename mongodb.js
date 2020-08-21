//CRUD

const {MongoClient,ObjectId}=require('mongodb')

const connectionURL=process.env.MONGODB_CONNECTION_URL
const databaseName='taskmanager'


// const id=new ObjectId()
// console.log(id.id.length)
// console.log(id.toHexString().length)
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
       return  console.log("Not connected")
    }
  
     const db=client.db(databaseName)

     //CREATE
    //  db.collection('users').insertOne({
    //      name:"Rahul",
    //      age:21
    //  },(error,result)=>{
    //      if(error){
    //          return console.log("Unable to insert")
    //      }
    //      console.log(result.ops)

    //  })
    // db.collection('users').insertMany([
    //     {
    //         name:"Jen",
    //         age:28

    //     },{
    //         name:"Ron",
    //         age:24

    //     }
    // ],(error,result)=>{
    // if(error){
    //     return console.log("Unable to insert")
    //  }
    //     console.log(result.ops)

    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description:"Assignment 1",
    //         completed:true

    //     },{
    //         description:"Assignment 2",
    //         completed:false

    //     }
    // ],(error,result)=>{
    // if(error){
    //     return console.log("Unable to insert")
    //  }
    //     console.log(result.ops)

    // })


//     db.collection('users').findOne({_id:ObjectId("5eecbcd6f7670922c41a548e")},(error,user)=>{
// if(error){
//     return console.log("Unable to read")
// }
// console.log(user)
//     })
//     db.collection('users').find({name:"Rahul"}).toArray((error,users)=>{
//         console.log(users)
//     })
//     db.collection('users').find({name:"Rahul"}).count((error,count)=>{
//         console.log(count)
//     })
 

//READ
// db.collection('tasks').findOne({_id:ObjectId("5ee9de993f3a243a7cec3576")},(error,task)=>{
//     console.log(task)
// })
   
// db.collection('tasks').find({completed:false}).toArray((error,task)=>{
//     console.log(task)
// })
    

//UPDATE
// db.collection('users').updateOne({_id:ObjectId("5eecbcd6f7670922c41a548e")},{
//     $inc:{
//         age:5
//     }
// }).then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })
// db.collection('tasks').updateMany({completed:false},{
//     $set:{
//         completed:true
//     }
// }).then((result)=>{
// console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

//DELETE
// db.collection('users').deleteMany(
//     {
//         age:26
//     }).then((result)=>{
//   console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

db.collection('tasks').deleteOne({

    description:"Assignment 1"
}).then((result)=>{
console.log(result)
}).catch((error)=>{
    console.log(error)
})
})