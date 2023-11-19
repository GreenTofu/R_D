import * as fs from 'fs';
import { join } from 'path';

import fileUpload from 'express-fileupload';

import { DEFAULT_IMAGES } from 'utils/constant';
import ErrorWithStatusCode from 'utils/errors';

const getDefaultImagePathAndURL = () => {
  const imageURL = join(process.env.BACKEND_URL, 'images');
  const imagePath = join(
    __dirname,
    __dirname.includes('build') ? '../../../src' : '../',
    process.env.STORAGE_URL,
  );
  return { imageURL, imagePath };
};

const imageConfig = fileUpload({
  limits: { fileSize: 2 * 1024 * 2014 },
  limitHandler: (req, res, next) => {
    next(
      new ErrorWithStatusCode(
        'File size limit has been reached',
        413,
      ),
    );
  },
  useTempFiles: true,
  tempFileDir: '/tmp/',
});

const sendFile = (req, res) => {
  const { filename } = req.params;

  const { imagePath } = getDefaultImagePathAndURL();
  const image = join(imagePath, filename);

  res.sendFile(image);
};

const uploadImage = (imageFile, previousImgURL) => {
  const { imageURL, imagePath } = getDefaultImagePathAndURL();

  const currentImagePath = join(previousImgURL).replace(
    imageURL,
    imagePath,
  );

  if (
    previousImgURL !== null &&
    !DEFAULT_IMAGES.includes(currentImagePath.split('\\').pop())
  ) {
    try {
      fs.unlinkSync(currentImagePath);
    } catch (error) {
      console.log('No image to delete');
    }
  }

  const uploadDir = 'avatar';

  if (!fs.existsSync(join(imagePath, uploadDir))) {
    fs.mkdirSync(join(imagePath, uploadDir), { recursive: true });
  }

  const fileName = `${(Math.random() + 1)
    .toString(36)
    .substring(7)}${new Date()
    .toISOString()
    .replaceAll(':', '')}.${imageFile.name.split('.').pop()}`;

  const newPathImage = join(imagePath, uploadDir, fileName);

  imageFile.mv(newPathImage);

  const newURLImage = join(imageURL, uploadDir, fileName);

  return new URL(newURLImage).href;
};
export { imageConfig, sendFile, uploadImage };
