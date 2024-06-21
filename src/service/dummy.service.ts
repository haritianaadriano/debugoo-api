import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dummy } from '../model/dummy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DummyService {
  constructor(
    @InjectRepository(Dummy)
    private readonly dummyRepository: Repository<Dummy>,
  ) {}

  async findAll(): Promise<string> {
    try {
      return (await this.dummyRepository.find()).length == 0 ? 'OK' : '';
    } catch (err) {
      throw new HttpException(
        { message: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
