

const express=require('express')
const auth=require('../middleware/auth')
const router=new express.Router()
const Task=require('../models/task')
router.post('/tasks',auth, async (req,res)=>{
    // const task=new Task(req.body)
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
     await task.save()
     res.send(task)
    }
   catch(e){
       res.status(500).send(e)
   }
  
})

//GET /tasks?completed=true
//GET /tasks?limit=1&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
  const match={  }
  const sort={}
  if(req.query.completed){
      match.completed=req.query.completed==='true'
 
  }
  if(req.query.sortBy){
  const parts=req.query.sortBy.split(":")
  sort[parts[0]]=parts[1]==='desc' ? -1 : 1


}
    try{
    //  const tasks= await Task.find({owner:req.user._id})
    await req.user.populate({
         path:'tasks',
         match,
         options:{
             limit:parseInt(req.query.limit),
             skip:parseInt(req.query.skip),
             sort
         }
           
         
    }).execPopulate()
     res.send(req.user.tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
 
})
router.get('/tasks/:taskid',auth,async (req,res)=>{
    const _id=req.params.taskid
    
    try{
   const task= await  Task.findOne({_id,owner:req.user._id})
   if(!task){
      return  res.status(404).send()
   }
   res.send(task)
    }
    catch(e){
        res.status(500).send(e) 
    }

})


router.patch("/tasks/:id",auth,async (req,res)=>{
    
    const updates=Object.keys(req.body)
    const allowed=['description','completed']
    const valid=updates.every((update)=>allowed.includes(update))
    if(!valid){
        return  res.status(404).send({error:"invalid key"})
    }

    const taskid=req.params.id
    try{
   const task= await Task.findOne({_id:taskid,owner:req.user._id})
   if(!task){
    res.status(404).send()
}
   updates.forEach((update)=> task[update]=req.body[update])
   task.save()
 
   res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.delete("/tasks/:id",auth,async (req,res)=>{
    try{
      
      const task= await Task.findByIdAndDelete({_id:req.params.id,'owner':req.user._id})
      if(!task){
          return res.status(404).send()
      }
      res.send(task)
    }
    catch(e){
    res.status(500).send(e)
    }
})

module.exports=router