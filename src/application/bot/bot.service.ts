import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { SearchService } from '../movie/search.service';
import { HttpService } from '@nestjs/axios';
import { DownloadMovieDto } from './dto/movie.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  constructor(
    @InjectBot() private bot: Telegraf,
    private readonly userService: UserService,
    private readonly searchService: SearchService,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    this.initialize();
  }
  initialize() {
    this.bot.start((ctx) => this.handleStart(ctx));
    this.bot.hears(/\/search (.+)/, (ctx) => this.handleSearch(ctx));
    this.bot.on('callback_query', async (ctx: Context) => {
      this.handleCallback(ctx);
    });
  }

  private async handleStart(ctx) {
    const telegramUsername = ctx.from.username;
    await this.userService.createUser(telegramUsername);
    ctx.reply(
      `Welcome, ${telegramUsername}!, use /search and enter a movie title and send it`,
    );
  }

  private async handleSearch(ctx) {
    const searchTerm = ctx.match[1];
    const results = await this.searchService.search(searchTerm);
    const movieButtons = results.map((movie) => [
      Markup.button.callback(movie.name, `movie:${movie.name}`),
    ]);
    if (movieButtons.length > 0) {
      ctx.reply('Search results:', Markup.inlineKeyboard(movieButtons));
    } else {
      ctx.reply('No matching movies found.');
    }
  }

  private async handleCallback(ctx: Context) {
    const callbackData = ctx.callbackQuery;
    let data = (callbackData as any).data;
    if (data.startsWith('movie:')) {
      const selectedMovie = data.substring('movie:'.length);

      let resultMovie = await this.searchService.getMovieDetail(selectedMovie);
      console.log('here', resultMovie);

      let imageBuffer = await this.downloadImageBuffer(resultMovie.images[0]);
      let links = ['https://en.wikipedia.org/1.png'].map((link, index) => {
        return {
          text: `link ${index}`,
          url: link,
        };
      });
      console.log(links);

      let movieDetails = new DownloadMovieDto(resultMovie, imageBuffer, links);
      this.sendMovieDownloadInformation(ctx, movieDetails);
    } else {
      ctx.reply('Unknown callback');
    }
  }

  private async downloadImageBuffer(url: string) {
    const response = await this.httpService.axiosRef.get(url, {
      responseType: 'arraybuffer',
    });

    return response.data;
  }

  private async sendMovieDownloadInformation(
    ctx: Context,
    movieDetails: DownloadMovieDto,
  ) {
    const linkButtons = movieDetails.links.map((movie) => [
      Markup.button.callback(movie.text, `movie:${movie.url}`),
    ]);
    const inlineKeyboardMarkup = Markup.inlineKeyboard(linkButtons) as any;

    if (movieDetails.imageBuffer) {
      await ctx
        .replyWithPhoto(
          { source: movieDetails.imageBuffer },
          {
            caption: `<b>${movieDetails.title}</b>\n\n${movieDetails.description}`,
            parse_mode: 'HTML',
            reply_markup: inlineKeyboardMarkup,
          },
        )
        .then((res) => {
          ctx.reply('Download links:', Markup.inlineKeyboard(linkButtons));
        })
        .catch((err) => {
          console.log('err:', err);
        });
    } else {
      ctx
        .reply(`<b>${movieDetails.title}</b>\n\n${movieDetails.description}`, {
          parse_mode: 'HTML',
        })
        .then((res) => {
          ctx.reply('Download links:', Markup.inlineKeyboard(linkButtons));
          console.log(res);
        })
        .catch((err) => {
          console.log('err:', err);
        });
    }
  }
}
