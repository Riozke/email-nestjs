import { Controller, Get, Query } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';

@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Get('parse')
  async parseEmail(@Query('filePath') filePath: string) {
    return this.emailParserService.parseEmail(filePath);
  }
}
