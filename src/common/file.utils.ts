import { BadRequestException } from "@nestjs/common";
import { extname } from "path";
/*
    Usage:

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
        originalname: file.originalname,
        filename: file.filename,
        };
        return response;
    }

    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
        const fileReponse = {
            originalname: file.originalname,
            filename: file.filename,
        };
        response.push(fileReponse);
        });
        return response;
    }
*/

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException("Only image files are allowed!"),
      false
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${name}-${randomName}${fileExtName}`);
};
