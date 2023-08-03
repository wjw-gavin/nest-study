import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileInfo } from './entities/file.entity'
import { Repository } from 'typeorm'
import { FileInfoDto } from './dto/file.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class FileService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(FileInfo)
    private readonly fileInfoRepository: Repository<FileInfo>
  ) {}

  async saveFile(fileInfo: FileInfoDto) {
    const fileInfoEntity = this.fileInfoRepository.create(fileInfo)
    return await this.fileInfoRepository.save(fileInfoEntity)
  }

  async getFileInfoById(id: number) {
    return await this.fileInfoRepository.findOneBy({ id })
  }
}
