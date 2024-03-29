import {
  Req,
  Res,
  Get,
  Post,
  Param,
  Controller,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { Request, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { resSendFileByName, verifyCookieTokenAsync } from 'src/commons/utils'
import { Public } from 'src/commons/decorators/public.decorator'
import { FileService } from './file.service'
import { URL_PREFIX } from 'src/commons/constants'

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileInfo = {
      path: file.path,
      size: file.size,
      fileName: file.filename,
      originalName: file.originalname
    }
    const result = await this.fileService.saveFile(fileInfo)
    return {
      url: `/${URL_PREFIX}/file/${file.filename}`,
      ...result
    }
  }

  @Public()
  @Get(':fileName')
  async getFile(
    @Param('fileName') fileName: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await verifyCookieTokenAsync(req)

    return resSendFileByName(res, fileName)
  }
}
