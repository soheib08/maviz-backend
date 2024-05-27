export class Chat {
  id: string;
  user: string;
  date: string;
  messages: Array<ChatMessage>;
}

export class ChatMessage {
  role: string;
  content: string;
}
