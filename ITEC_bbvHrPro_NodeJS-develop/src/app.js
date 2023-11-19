import cors from 'cors';
import express from 'express';

import errorHandler from 'api/middlewares/errorHandler';
import authenRouter from 'api/routes/authentication';
import criteriaRouter from 'api/routes/criteria';
import goalRouter from 'api/routes/goal';
import performanceReviewRouter from 'api/routes/performanceReview';
import projectRouter from 'api/routes/project';
import resourceRouter from 'api/routes/resource';
import userRouter from 'api/routes/user';
import { imageConfig, sendFile } from 'services/image';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(imageConfig);

app.use('/api/authentication', authenRouter);

app.use('/api/users', userRouter);

app.use('/api/resources', resourceRouter);

app.use('/api/projects', projectRouter);

app.use('/api/goals', goalRouter);

app.use('/api/criteria', criteriaRouter);

app.use('/api/performance-reviews', performanceReviewRouter);

app.get('/images/:filename(*)', sendFile);

app.use('/', (req, res) => {
  res.send('bbvHRPro API');
});

app.use(errorHandler);

export default app;
