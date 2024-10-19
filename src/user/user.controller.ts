import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { ToggleFavoriteMovieDto } from './dto/toggle-favorite-movie.dto';

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

  @Post(':id/favorites/movie')
  addFavoriteMovie(
    @Param('id') userId: number,
    @Body() toggleFavoriteMovieDto: ToggleFavoriteMovieDto,
  ) {
    return this.userService.addMovieToFavorites(
      userId,
      toggleFavoriteMovieDto.movieId,
    );
  }

  @Delete(':id/favorites/movie')
  removeFavoriteMovie(
    @Param('id') userId: number,
    @Body() toggleFavoriteMovieDto: ToggleFavoriteMovieDto,
  ) {
    return this.userService.removeMovieFromFavorites(
      userId,
      toggleFavoriteMovieDto.movieId,
    );
  }
}
