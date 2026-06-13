import { diskStorage } from 'multer'
import { extname } from 'path'
import { BadRequestException } from '@nestjs/common'

export const multerOptions = {
  storage: diskStorage({
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now + '-' + Math.round(Math.random() * 1e9)
      const ext = extname(file.originalname)
      callback(null, `hyperdrive-${uniqueSuffix}${ext}`)
    }
  }),

  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(
        new BadRequestException('Only image files (.jpg, .jpeg, .png) are permitted'),
        false
      )
    }
    callback(null, true)
  },

  limits: {
    fileSize: 2 * 1024 * 1024
  }
}