import bcrypt from 'bcrypt';

export const createHashedPassword = async (
  clientPassword: string,
  saltRounds: number = 10
): Promise<string> => {
  return await bcrypt.hash(clientPassword, saltRounds);
};

export const verifyPasswordMatches = async (
  clientPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatchedPassword = await bcrypt.compare(
    clientPassword,
    hashedPassword
  );
  return isMatchedPassword;
};
