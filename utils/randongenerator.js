export const generateOTP = (length = 4) => {
  let str = "";
  for (let i = 0; i < 4; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
