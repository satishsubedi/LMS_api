import { emailTransporter } from "./transport.js";
import {
  emailActivatedUrlTemplate,
  emailActivateUrlTemplate,
  emailOTPTemplate,
  emailPasswordResetTemplate,
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

export const passwordresetOTPEmail = async (obj) => {
  // get the transporter

  // get the template
  const info = await emailTransporter().sendMail(emailOTPTemplate(obj));

  console.log(info.messageId);
  return info.messageId;
};

export const passwordChangeNotificationEmail = async (obj) => {
  const info = await emailTransporter().sendMail(
    emailPasswordResetTemplate(obj)
  );
  console.log(info.messageId);
  return info.messageId;
};
