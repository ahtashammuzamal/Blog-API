import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const hashedpassword = await bcrypt.hash(password, 8);
  console.log("Hashed password: ", hashedpassword);

  const isMatch = await bcrypt.compare(password, hashedpassword);
  return isMatch;
};
