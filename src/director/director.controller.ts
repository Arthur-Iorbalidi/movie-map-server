import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';

@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
  ) {
    return this.directorService.getAll({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    });
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
