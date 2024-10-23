import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';

@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  getAll() {
    return this.directorService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.directorService.getById(id);
  }

  @Post()
  createDirector(@Body() directorDto: CreateDirectorDto) {
    return this.directorService.createDirector(directorDto);
  }
}
