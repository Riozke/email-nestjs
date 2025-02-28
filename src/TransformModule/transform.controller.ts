import { Controller, Post, Body } from '@nestjs/common';
import { TransformService } from './transform.service';
import { OutputDTO } from './dto/output.dto';

@Controller('transform')
export class TransformController {
    constructor(private readonly transformService: TransformService) { }

    @Post()
    transform(@Body() input: any): OutputDTO {
        return this.transformService.transform(input);
    }
}
