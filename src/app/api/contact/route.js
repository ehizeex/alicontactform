import { NextResponse } from 'next/server'
 
export async function POST(request) {
    require('dotenv').config()
     const data=await request.json()
    let nodemailer = require('nodemailer')
    try{
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      service:"gmail",
      
      auth: {
        user: process.env.EMAIL, //type your email
        pass: process.env.PASSWORD, //enable 2 factor authentication on gmail and generate a password from App passwords section 
      },
     
    })
    
    const info = await transporter.sendMail({
      from: `"${data.name}"`, 
      to: process.env.EMAIL,//type the email where you want to send 
      subject: `Inquiry from Website Contact Form`, 
      text: "", 
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
      
        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 5px;
        }
        .signature {
            font-style: italic;
            font-size: 14px;
        }
      </style>
</head>
<body>
    <div class="email-container">

        <p>Dear,</p>

        <p>I hope this message finds you well. I wanted to share some information with you regarding an inquiry we received through our website contact form. Below are the details provided by the visitor:</p>

        <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phoneNumber}</li>
            <li><strong>Subject:</strong> ${data.subject}</li>
            <li><strong>Message:</strong><br>${data.message}</li>
        </ul>



        <p class="signature">Best regards</p>
    </div>
</body>
</html>

      `, 
    });
    if(info.messageId){
      return NextResponse.json({ error:false, message:"Message successfully sent!" })

    }
    return NextResponse.json({ error:true, message:'Something went wrong please try again.' })

  }
  catch(e){
    return NextResponse.json({ error:true, message:'Something went wrong please try again.' })

  }
  }