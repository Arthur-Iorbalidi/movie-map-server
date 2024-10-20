import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { ToggleFavoriteMovieDto } from './dto/toggle-favorite-movie.dto';
import { ToggleFavoriteActorDto } from './dto/toggle-favorite-actor.dto';
import { ToggleFavoriteDirectorDto } from './dto/toggle-favorite-director.dto';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Getting Users' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Getting User by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (userId !== parsedId) {
      throw new ForbiddenException('You can update only your own profile');
    }

    return this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/movie')
  addFavoriteMovie(
    @Req() req,
    @Body() toggleFavoriteMovieDto: ToggleFavoriteMovieDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.addMovieToFavorites(
      userId,
      toggleFavoriteMovieDto.movieId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/movie')
  removeFavoriteMovie(
    @Req() req,
    @Body() toggleFavoriteMovieDto: ToggleFavoriteMovieDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.removeMovieFromFavorites(
      userId,
      toggleFavoriteMovieDto.movieId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/actor')
  addFavoriteActor(
    @Req() req,
    @Body() toggleFavoriteActorDto: ToggleFavoriteActorDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.addActorToFavorites(
      userId,
      toggleFavoriteActorDto.actorId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/actor')
  removeFavoriteActor(
    @Req() req,
    @Body() toggleFavoriteActorDto: ToggleFavoriteActorDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.removeActorFromFavorites(
      userId,
      toggleFavoriteActorDto.actorId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/director')
  addFavoriteDirector(
    @Req() req,
    @Body() toggleFavoriteDirectorDto: ToggleFavoriteDirectorDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.addDirectorToFavorites(
      userId,
      toggleFavoriteDirectorDto.directorId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/director')
  removeFavoriteDirector(
    @Req() req,
    @Body() toggleFavoriteDirectorDto: ToggleFavoriteDirectorDto,
  ) {
    const userId: number = req.user.id;

    return this.userService.removeDirectorFromFavorites(
      userId,
      toggleFavoriteDirectorDto.directorId,
    );
  }
}
