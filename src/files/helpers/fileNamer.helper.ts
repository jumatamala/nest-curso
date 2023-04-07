import { v4 as uuid } from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cb: Function,
) => {
  /* if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    } */
  if (!file) return cb(new Error('No file provided'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;

  return cb(null, fileName);
};
