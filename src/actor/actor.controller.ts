import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  getAll() {
    return this.actorService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.actorService.getById(id);
  }

  @Post()
  createActor(@Body() directorDto: CreateActorDto) {
    return this.actorService.createActor(directorDto);
  }
}
