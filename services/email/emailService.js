import { emailTransporter } from "./transport.js";
import {
  emailActivatedUrlTemplate,
  emailActivateUrlTemplate,
} from "./emailTemplate.js";
export const emailActivationUrl = async (obj) => {
  // get the transporter

  // get the template
  const info = await emailTransporter().sendMail(emailActivateUrlTemplate(obj));

  console.log(info.messageId);
  return info.messageId;
};

// User acivated email notification
export const userEmailActivation = async (obj) => {
  // get the transporter

  // get the template
  const info = await emailTransporter().sendMail(
    emailActivatedUrlTemplate(obj)
  );

  console.log(info.messageId);
  return info.messageId;
};
