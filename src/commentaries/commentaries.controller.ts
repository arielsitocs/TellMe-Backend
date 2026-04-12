import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { CommentaryService } from './commentaries.service';
import { CommentaryDto } from './dto/commentary.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('/commentaries')
export class CommentaryController {
  constructor(private commentaryService: CommentaryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCommentary: CommentaryDto, @Req() req: Request & { user: { sub: number } }) {
    return this.commentaryService.create(createCommentary, req.user.sub);
  }

  @Get()
  findAll() {
    return this.commentaryService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentaryService.findOne(id);
  }

  // @Patch('/:id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CommentaryDto, @Req() req: Request & { user: { sub: number } }) {
  //   return this.commentaryService.update(id, updateUserDto, req.user.sub);
  // }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: { sub: number } }) {
    return this.commentaryService.remove(id, req.user.sub);
  }
}
