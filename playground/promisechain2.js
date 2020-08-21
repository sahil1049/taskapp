require('../src/db/mongoose')
const Task=require('../src/models/task')

// Task.findByIdAndDelete('5ef4c7ba8564372ee864caa0').then((task)=>{
//     console.log(task)
//     return Task.find({completed:false})
// }).then((tasks)=>{
//     console.log(tasks)
// }).catch((e)=>{
//     console.log(e)
// })
const deleteTaskandCount=async (id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:true})
    return count
}
deleteTaskandCount('5ef626ab50aaaf0f08727f01').then((count)=>{
  console.log(count)
}).catch((e)=>{
    console.log(e)
})