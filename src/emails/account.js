const sgmail=require('@sendgrid/mail')
const sendGridApi=process.env.SENDGRID_API_KEY

sgmail.setApiKey(sendGridApi)

const signupmail=(email,name)=>{
    sgmail.send(
        {
            to:email,
            from:'khuranasahil170@gmail.com',
            subject: 'Thanks for registring',
            text: `Welcome to the app, ${name}`
           
        }
    )

}
const cancelmail=(email,name)=>{
    sgmail.send(
        {
            to:email,
            from:'khuranasahil170@gmail.com',
            subject: 'Sorry to see you go',
            text: `We are really sorry ${name} that our service were not upto your expectations. Please provide us some 
            suggesgions so that we can work on that. `
           
        }
    )

}
module.exports={
    signupmail,
    cancelmail
}