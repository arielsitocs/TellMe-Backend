import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/password.dto';
import { FollowDto } from './dto/follow.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('/users')
export class UsersController {
  // Establecemos el cloudinary service para la subida de imagenes //
  constructor(private usersService: UsersService, private cloudinaryService: CloudinaryService) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('image')) // intercepta el archivo en el campo image en el form //
  async create(@Body() createUser: UserDto, @UploadedFile() file ?: { buffer: Buffer, mimetype: string }) {
    let imageurl: string | undefined;

    // Si hay archivo en la peticion de sube la imagen //
    if (file) {
      imageurl = await this.cloudinaryService.uploadImage(file);
    }

    return this.usersService.create(createUser, imageurl);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/follow')
  getFollows() {
    return this.usersService.findFollows();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image')) // intercepta el archivo en el campo image en el form //
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UserDto, @Req() req: Request & { user: { sub: number } }, @UploadedFile() file?: { buffer: Buffer, mimetype: string }) {
    let imageurl: string | undefined;

    // Si hay archivo en la peticion de sube la imagen //
    if (file) {
      imageurl = await this.cloudinaryService.uploadImage(file);
    }

    return this.usersService.update(id, updateUserDto, req.user.sub, imageurl);
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

  // RUTAS DE FOLLOWING //

  @Post('/follow')
  @UseGuards(JwtAuthGuard)
  follow(@Body() followData: FollowDto, @Req() req: Request & { user: { sub: number } }) {
    return this.usersService.follow(followData, req.user.sub)
  }

  @Delete('/follow/:followedid')
  @UseGuards(JwtAuthGuard)
  unfollow(@Param('followedid', ParseIntPipe) followedid: number, @Req() req: Request & { user: { sub: number } }) {
    return this.usersService.unfollow(followedid, req.user.sub)
  }
}
