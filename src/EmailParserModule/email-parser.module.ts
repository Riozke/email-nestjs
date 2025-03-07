import { Module } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { EmailParserController } from './email-parser.controller';

@Module({
  controllers: [EmailParserController],
  providers: [EmailParserService],
  exports: [EmailParserService],
})
export class EmailParserModule {}
