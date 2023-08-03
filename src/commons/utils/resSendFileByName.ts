import * as fs from 'fs'
import { Response } from 'express'
import { NotFoundException } from '@nestjs/common'
import { FILE_DIR } from 'src/commons/constants'

export const resSendFileByName = async (res: Response, fileName: string) => {
  const imagePath = `${FILE_DIR}/${fileName}`
  if (fs.existsSync(imagePath)) {
    res.sendFile(fileName, { root: FILE_DIR })
  } else {
    throw new NotFoundException('文件不存在！')
  }
}
