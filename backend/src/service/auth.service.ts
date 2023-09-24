import bcrypt from "bcrypt";

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const comparePassword = async (password: string, userPassword:string) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid
};

export { encryptPassword,comparePassword };
