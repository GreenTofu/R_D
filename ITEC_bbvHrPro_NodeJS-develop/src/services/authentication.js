import bcrypt from 'bcrypt';

import { User } from 'models';
import ErrorWithStatusCode from 'utils/errors';

import UserServices from './user';

const signUp = async (userData) => {
  const exitedUser = await User.findOne({
    where: { email: userData.email },
  });

  if (exitedUser !== null) {
    throw new ErrorWithStatusCode('Email is already exists', 401);
  }
  const user = await User.create(userData);

  return user;
};

const signIn = async (account) => {
  const user = await User.findOne({
    where: { email: account.email },
  });

  const isCorrectPasssword = await bcrypt.compareSync(
    account.password,
    user?.password || '',
  );

  if (!user || !isCorrectPasssword) {
    throw new ErrorWithStatusCode(
      'Incorrect username or password',
      400,
    );
  }
  const userProfile = await UserServices.getProfile(user?.id);

  const token = user.generateToken();

  return { token, user: userProfile };
};
const AuthenServices = { signIn, signUp };

export default AuthenServices;
