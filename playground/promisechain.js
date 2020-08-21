require('../src/db/mongoose')
const User=require('../src/models/user')
// 5ef626c450aaaf0f08727f02

// User.findByIdAndUpdate('5ef626c450aaaf0f08727f02',{age:21}).then((user)=>{
// console.log(user)
// return User.countDocuments({age:21})
// }).then((users)=>{
// console.log(users)
// }).catch((e)=>{
// console.log(e)
// })

const updateAgeandCount=async(id,age)=>{
    const user= await User.findByIdAndUpdate(id,{age:age})
    
    const count=await User.countDocuments({age:age})
    return count
}
updateAgeandCount('5ef626c450aaaf0f08727f02',22).then((count)=>{
console.log(count)
}).catch((e)=>{
    console.log(e)
})