const express=require('express')
const auth=require('../middleware/auth')
const sharp=require('sharp')
const router=new express.Router()
const User=require('../models/user')
const multer=require('multer')
const {signupmail,cancelmail}=require('../emails/account')
const upload=multer({
 
    limits:{
      fileSize:1000000
      
    },
    fileFilter(req,file,cb){
        // cb(new Error("file must be a pdf"))
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
          return cb(new Error("Upload an image"))
        }
   cb(undefined,true)

    }
})

router.post('/users',async(req,res)=>{
    const user=new User(req.body)
 try{
    await user.save()
    signupmail(user.email,user.name)
    const token=await user.generateAuthToken()
    res.status(200).send({user,token})
 }
 catch(e){
     res.status(404).send(e)

 }
    
})
router.post('/users/login',async (req,res)=>{

    try{
      const user=await User.findByCredentials(req.body.email,req.body.password)
      const token=await user.generateAuthToken()
      res.send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

})
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{

            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
   res.status(500).send()
    }
})
router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
   res.status(500).send()
    }
})
router.get('/users/me',auth,async (req,res)=>{

    res.send(req.user)

})

router.patch("/users/me",auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowed=['name','age','password','email']
    const isValid= updates.every((update)=> allowed.includes(update))
    if(!isValid){
         return res.status(400).send({error:'Invalid key'})
    }
    const _userid=req.user._id
    try{
        const user=await User.findById(_userid)
        updates.forEach((update)=> req.user[update]=req.body[update])
        await req.user.save()
    // const user=await User.findByIdAndUpdate(_userid,req.body,{new:true,runValidators:true})
 
   res.send(req.user)
    }
    catch(e){
        res.status(500).send(e) 
    }
})
router.delete("/users/me",auth,async (req,res)=>{
    try{
    //   const id=req.user._id
    //   const user= await User.findByIdAndDelete(id)
   
      await req.user.remove()
      const email=req.user.email
      const name=req.user.name
      cancelmail(email,name)
      res.send("user successfully deleted")
    }
    catch(e){
    res.status(500).send(e)
    }
})
router.post('/users/me/avatar',auth,upload.single('upload'),async (req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send(200)
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
   await req.user.save()
   res.send(200)
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
      const user=await User.findById(req.params.id)
      if(!user || !user.avatar){
        throw new Error()
      }
      res.set('Content-Type','image/png')
      res.send(user.avatar)
    }
    catch{
        res.status(404).send()
    }
})
module.exports=router