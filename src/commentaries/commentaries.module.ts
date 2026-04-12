import { Module } from '@nestjs/common';
import { CommentaryService } from './commentaries.service';
import { CommentaryController } from './commentaries.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CommentaryController],
  providers: [CommentaryService, PrismaService],
})
export class CommentariesModule {}
