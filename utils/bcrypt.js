import bcrypt from "bcryptjs";
export const hashpassword =(plainpassword)=>{
    const saltRound =15;
    return bcrypt.hashSync(plainpassword,saltRound);
}