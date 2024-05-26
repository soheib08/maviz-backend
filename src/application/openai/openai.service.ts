import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { log } from 'console';
import OpenAI from 'openai';

export class QuestionQuery {
  systemRules: Array<string>;
  history: Array<ChatMessage>;
  message: string;
  userPreData?: Array<string>;
  userHistory?: {};
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
    this.apiKey = 'sk-proj-03ahWkys8OKRQyzvJdDYT3BlbkFJlNtvaM26yNndaYhDWVzx';
    this.openAiClient = new OpenAI({
      apiKey: this.apiKey,
    });
  }
  onModuleInit() {
    this.askQuestion({ history: [], message: 'hi chatgpt', systemRules: [] });
  }

  async askQuestion(request: QuestionQuery) {
    const systemRules = request.systemRules.map((element) => {
      return { role: 'system', content: element };
    });
    let message = { role: 'user', content: request.message };

    const messages = systemRules.concat(request.history);
    messages.push(message);
    try {
      log('on send request');
      let res = await this.openAiClient.chat.completions.create({
        messages: [{ role: 'system', content: message.content }],
        model: 'gpt-3.5-turbo',
      });
      log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
