import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailParserModule } from './EmailParserModule/email-parser.module';
import { TransformModule } from './TransformModule/transform.module';

@Module({
  imports: [EmailParserModule, TransformModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
