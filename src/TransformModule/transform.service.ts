import { Injectable } from '@nestjs/common';
import { InputDTO } from './dto/input.dto';
import { OutputDTO } from './dto/output.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformService {
    transform(input: any): OutputDTO {
        const inputDto = plainToClass(InputDTO, input);

        const record = inputDto.Records[0];
        const receipt = record.ses.receipt;
        const mail = record.ses.mail;

        const output = new OutputDTO();
        output.spam = receipt.spamVerdict.status === 'PASS';
        output.virus = receipt.virusVerdict.status === 'PASS';
        output.dns =
            receipt.spfVerdict.status === 'PASS' &&
            receipt.dkimVerdict.status === 'PASS' &&
            receipt.dmarcVerdict.status === 'PASS';
        output.mes = new Date(mail.timestamp).toLocaleString('en-US', {
            month: 'long',
        });
        output.retrasado = receipt.processingTimeMillis > 1000;
        output.emisor = mail.source.split('@')[0];
        output.receptor = mail.destination.map((dest) => dest.split('@')[0]);

        return output;
    }
}
