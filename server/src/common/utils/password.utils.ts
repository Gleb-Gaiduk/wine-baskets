import bcrypt from 'bcrypt';

export const createHashedPassword = async (
  clientPassword: string,
  saltRounds: number = 10
): Promise<string> => {
  return await bcrypt.hash(clientPassword, saltRounds);
};

// async function checkUser(username, password) {
//   //... fetch user from a db etc.

//   const match = await bcrypt.compare(password, user.passwordHash);

//   if (match) {
//     //login
//   }

//   //...
// }
