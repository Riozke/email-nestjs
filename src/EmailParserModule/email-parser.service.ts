import { Injectable, BadRequestException } from '@nestjs/common';
import { simpleParser, ParsedMail } from 'mailparser';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class EmailParserService {
  async parseEmail(filePath: string): Promise<any> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new BadRequestException('The email file does not exist.');
      }

      const emailBuffer = fs.readFileSync(filePath);
      let parsed: ParsedMail;
      try {
        parsed = (await simpleParser(emailBuffer)) as ParsedMail;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new BadRequestException(`Error parsing the email: ${error.message}`);
        }
        throw new BadRequestException('Unknown error while parsing the email.');
      }

      for (const attachment of parsed.attachments) {
        if (attachment.contentType === 'application/json') {
          const jsonString = attachment.content.toString('utf-8');
          try {
            return JSON.parse(jsonString);
          } catch (error) {
            throw new BadRequestException('The attached JSON is not valid.');
          }
        }
      }

      const body = parsed.text || '';
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = body.match(urlRegex);

      if (urls) {
        for (const url of urls) {
          try {
            const response = await axios.get(url);
            if (response.headers['content-type'].includes('application/json')) {
              return response.data;
            }
          } catch (error) {
            console.error(`Error accessing URL ${url}: ${error.message}`);
          }
        }
      }

      throw new BadRequestException('No valid JSON found in the email.');
    } catch (error) {
      throw new BadRequestException(
        `Error processing the email: ${error.message}`
      );
    }
  }
}
