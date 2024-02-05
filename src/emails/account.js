const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'siddharthpathak415@gmail.com',
        subject: 'Welcome to Taskr',
        text: `Welcome to the Taskr app, ${name}. Let me know how you find the app!`
    })
}

module.exports = {
    sendWelcomeEmail
}