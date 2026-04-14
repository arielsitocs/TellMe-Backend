import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/password.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() createUser: UserDto) {
    return this.usersService.create(createUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UserDto, @Req() req: Request & { user: { sub: number } }) {
    return this.usersService.update(id, updateUserDto, req.user.sub);
  }

  @Patch('/password/:id')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Param('id', ParseIntPipe) id: number, @Body() PasswordDto: UpdatePasswordDto, @Req() req: Request & { user: { sub: number } }) {
    return this.usersService.updatePassword(id, PasswordDto, req.user.sub);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: { sub: number } }) {
    return this.usersService.remove(id, req.user.sub);
  }
}
