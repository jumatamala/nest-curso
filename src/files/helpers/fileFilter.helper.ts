export const fileFilter = (
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
  const validateExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validateExtensions.includes(fileExtension)) {
    return cb(null, false);
  }

  return cb(null, true);
};
