import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { generationConfig, safetySettings } from './constants/gemini.config';
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

@Injectable()
export class GeminiService implements OnModuleInit {
  apiKey: string;
  genAI;
  model;
  private readonly logger = new Logger(GeminiService.name);
  constructor() {
    this.apiKey = 'AIzaSyAdBrYPLTYcTRF02CpW61bGWP8Cfb0rhK4';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }

  onModuleInit() {
    this.run();
  }

  async run() {
    const chatSession = this.model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'hi\n' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hi there! What can I do for you today? \n' }],
        },
        {
          role: 'user',
          parts: [{ text: 'is your apies are free?\n' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "It looks like you're asking about whether my APIs are free to use.  As a large language model, I don't have APIs in the same way that a software service does. I'm part of Google AI and my access is through Google's systems. \n\nIf you're looking for free APIs for language processing, there are a few options you might explore:\n\n* **OpenAI's API:** They offer a variety of language models and tasks, with a free tier for limited usage.\n* **Hugging Face's Transformers:**  A library with many pre-trained language models that can be used for various tasks.\n* **Google Cloud's Natural Language API:** Offers a range of natural language processing features, with a free tier for limited use.\n\nIf you can tell me more about what kind of APIs you're interested in, I might be able to provide more specific recommendations. \n",
            },
          ],
        },
        {
          role: 'user',
          parts: [{ text: 'how can i use you in nodejs ?\n' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "You can't directly use me (Bard) in Node.js like you would a traditional library or API. I'm a large language model running on Google's infrastructure, and there's no way to directly interact with me through a Node.js script.\n\nHowever, you can achieve similar functionality by using Google Cloud's services within your Node.js project. Here's a breakdown of how to do it:\n\n**1. Google Cloud Platform Setup:**\n\n* **Create a Project:**  Start by creating a new project on the Google Cloud Platform console: [https://console.cloud.google.com/](https://console.cloud.google.com/)\n* **Enable API:**  Enable the **Cloud Natural Language API** within your project. This API provides tools for text analysis, including sentiment analysis, entity recognition, and more.\n\n**2. Node.js Setup:**\n\n* **Install the Client Library:**\n   ```bash\n   npm install @google-cloud/natural-language\n   ```\n\n**3. Example Code:**\n\n```javascript\nconst { LanguageServiceClient } = require('@google-cloud/natural-language');\n\n// Create a client\nconst client = new LanguageServiceClient();\n\n// Set up the request\nconst document = {\n  content: 'This is a very positive sentence. I am so happy!',\n  type: 'PLAIN_TEXT',\n};\n\n// Make the request\nclient.analyzeSentiment({ document: document })\n  .then(result => {\n    const sentiment = result[0].documentSentiment;\n    console.log(`Sentiment score: ${sentiment.score}`);\n    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);\n  })\n  .catch(err => {\n    console.error('Error:', err);\n  });\n```\n\n**Explanation:**\n\n* The code imports the necessary `LanguageServiceClient` from the Google Cloud client library.\n* It creates a client object to interact with the Cloud Natural Language API.\n* The code then defines the `document` object, containing the text you want to analyze.\n* Finally, it sends the request to the API using the `analyzeSentiment` method, which returns sentiment analysis results (score and magnitude).\n\n**Important Considerations:**\n\n* **Authentication:** You'll need to set up authentication within your Node.js project to authorize access to the Google Cloud API. This usually involves using service account credentials or other methods provided by Google Cloud.\n* **Billing:** Google Cloud services typically have usage-based billing. Make sure to understand the pricing structure for the APIs you're using.\n* **Alternative APIs:** Explore other Google Cloud APIs like the **Cloud Translation API**, **Cloud Vision API**, or **Cloud Text-to-Speech API** for more advanced language-related tasks.\n\nRemember to consult the official Google Cloud documentation for more detailed setup instructions and API usage examples: [https://cloud.google.com/natural-language/docs](https://cloud.google.com/natural-language/docs)\n\nLet me know if you have any specific tasks or functionality in mind. I can help you find the right Google Cloud API and provide tailored code snippets. \n",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage('hi from api');
    console.log(result.response.text());
  }
}
