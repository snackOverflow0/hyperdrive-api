import { BadRequestException, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/file-upload.utilts';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('storage')
@UseGuards(AuthGuard('jwt'))
export class StorageController {
  constructor(private prisma: PrismaService) {}

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async uploadAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('File payload is missing or failed system size validation parameters.')
    }

    const userId = req.user.id

    const publicStoragePath = `/uploads/avatars/${file.filename}`

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: publicStoragePath
      }
    })

    return {
      message: 'Profile avatar asset uploaded and synchronized successfully.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        avatar: updatedUser.avatar
      }
    }
  }
}
