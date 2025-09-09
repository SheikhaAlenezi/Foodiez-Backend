import bcrypt from "bcrypt";

export const hashPassword = async (
  orignalPassword: string
): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(orignalPassword, saltRounds);
  return hashedPassword;
};
