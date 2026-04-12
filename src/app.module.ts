import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PublicationModule } from './publication/publication.module';
import { AuthModule } from './auth/auth.module';
import { CommentariesModule } from './commentaries/commentaries.module';

@Module({
  imports: [UsersModule, PublicationModule, AuthModule, CommentariesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
