import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiService } from './openai.service';

@Module({
  imports: [HttpModule],
  providers: [OpenAiService],
  exports: [],
})
export class AiModule {}
