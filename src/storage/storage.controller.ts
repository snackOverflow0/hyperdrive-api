import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/file-upload.utilts';

@Controller('storage')
@UseGuards(AuthGuard('jwt'))
export class StorageController {

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File payload is missing or failed system size validation parameters.')
    }

    return {
      message: 'Profile picture asset processed and written to storage successfully.',
      fileName: file.filename,
      storagePath: `/uploads/avatars/${file.filename}`,
      sizeInBytes: file.size
    }
  }
}
