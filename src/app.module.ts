import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LocalDatabaseModule } from './module/database.module';
import { DbHealthModule } from './module/dummy.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './module/post.module';
import { UserModule } from './module/user.module';
import { CommentModule } from './module/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DbHealthModule,
    AuthModule,
    PostModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
