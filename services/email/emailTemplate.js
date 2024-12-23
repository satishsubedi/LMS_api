export const emailActivateUrlTemplate = ({ email, name, url }) => {
  return {
    from: `"LMS 👻" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Activate your new account ✔", // Subject line
    text: `Hello ${name} click the link to activate your account. ${url}`, // plain text body
    html: `<b>${name}</b>
    
    <br/>
<br/>
<br/>
<a href =${url}>
<p>Your account has been created please click the button below to activate your account</p>
<button style="background:skyblue;color:white;padding 1rem;">Activate</button>
</a>
<br/>
Regards
<p>LMS team </p>
    
    `, // html body
  };
};

export const emailActivatedUrlTemplate = ({ email, name }) => {
  return {
    from: `"LMS 👻" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Acoount Activated email Notification ✔", // Subject line
    text: `Hello ${name} your account has been activated you may can Login`, // plain text body
    html: `<b>${name}</b>
    
    <br/>
<br/>
<br/>

<p>YHello  your account has been activated you may can Login

<br/>
Regards
<p>LMS team </p>
    
    `, // html body
  };
};
