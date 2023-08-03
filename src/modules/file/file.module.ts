import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { FILE_DIR } from 'src/commons/constants'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { FileInfo } from './entities/file.entity'

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_DIR // 文件保存路径
    }),
    TypeOrmModule.forFeature([FileInfo])
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
