import express from 'express';

import {
  signUpValidator,
  signInValidator,
} from 'api/middlewares/auth';
import AuthenServices from 'services/authentication';

const authenRouter = express.Router();

authenRouter.post(
  '/signUp',
  signUpValidator,
  async (req, res, next) => {
    try {
      const userData = req.body;
      const user = await AuthenServices.signUp(userData);

      res.json({
        message: 'Sign up successfully',
        user,
      });
    } catch (error) {
      next(error);
    }
  },
);

authenRouter.post(
  '/signIn',
  signInValidator,
  async (req, res, next) => {
    try {
      const userData = req.body;
      const { user, token } = await AuthenServices.signIn(userData);

      res.json({
        message: 'Sign in successfully',
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
);
export default authenRouter;
