import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('/publications')
export class PublicationController {

  constructor(private publicationService: PublicationService) { }

  // RUTAS DE PUBLICACIONES //

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() publicationData: PublicationDto) {
    return this.publicationService.create(publicationData);
  }

  @Get()
  findAll() {
    return this.publicationService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() newPublicationData: UpdatePublicationDto, @Req() req: Request & { user: { sub: number } }) {
    return this.publicationService.update(id, newPublicationData, req.user.sub);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: { sub: number } }) {
    return this.publicationService.remove(id, req.user.sub);
  }

  // RUTAS DE LIKES //

  @Get('/likes/all')
  getLikes() {
    return this.publicationService.getLikes();
  }

  @Post('/likes/:publicationid')
  @UseGuards(JwtAuthGuard)
  like(@Param('publicationid', ParseIntPipe) publicationid: number, @Req() req: Request & { user: { sub: number } }) {
    return this.publicationService.like(publicationid, req.user.sub);
  }

  @Delete('/likes/:publicationid')
  @UseGuards(JwtAuthGuard)
  dislike(@Param('publicationid', ParseIntPipe) publicationid: number, @Req() req: Request & { user: { sub: number } }) {
    return this.publicationService.dislike(publicationid, req.user.sub);
  }
}
