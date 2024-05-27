import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { log } from 'console';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources';

export class QuestionQuery {
  history: Array<ChatMessage>;
  message: ChatMessage;
}

export interface ChatMessage {
  role: string;
  content: string;
  name?: string;
}

@Injectable()
export class OpenAiService implements OnModuleInit {
  apiKey: string;
  openAiClient: OpenAI;
  private readonly logger = new Logger(OpenAiService.name);
  constructor(private httpService: HttpService) {
    this.apiKey = 'sk-proj-IbzB5akiSKOnqooewdC3T3BlbkFJTLNR1zJx2zT9GCLGkb08';
    this.openAiClient = new OpenAI({
      apiKey: this.apiKey,
    });
  }
  onModuleInit() {
    // this.askQuestion({
    //   history: [{ role: 'assistant', content: 'act like your super funny' }],
    //   message: { role: 'user', content: 'hi chatgpt' },
    // });
  }

  async askQuestion(request: QuestionQuery) {
    try {
      log('on send request');
      request.history.push(request.message);
      let res = await this.openAiClient.chat.completions.create({
        messages: request.history as any,
        model: 'gpt-3.5-turbo',
      });
      log(res.choices[0].message);
      return res.choices[0].message;
    } catch (err) {
      console.log(err);
    }
  }
}
