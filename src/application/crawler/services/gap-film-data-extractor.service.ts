import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface GapFilmResponse {
  Status: number;
  Message: string;
  Result: {
    TotalPage: number;
    Contents: Array<any>;
  };
}
@Injectable()
export class GapFilmDataExtractorService {
  private genres = ['8', '9', '10', '11', '12', '13', '14', '15', '16'];
  private siteBaseUrl =
    'https://core.gapfilm.ir/api/v3.3/GetFirstPageByPlatformPaging?EntityType=2&&';

  private readonly logger = new Logger(GapFilmDataExtractorService.name);
  constructor(private httpService: HttpService) {}

  async crawlGenre(genre: number) {
    const genreFirstPageData = await this.sendRequest(genre, 1, 100);
    if (genreFirstPageData.Status !== 1) {
      console.log('error on get data from gap film with this genre', genre);
      return;
    }
    const totalPages = genreFirstPageData.Result.TotalPage;
    genreFirstPageData.Result.Contents.forEach((movieData) => {
      let movieSummery = this.getMovieSummery(movieData);
    });

    for (let index = 2; index < totalPages; index++) {
      const element = totalPages[index];
    }
  }

  private async sendRequest(
    entityId: number,
    pageIndex: number,
    pageSize: number,
  ): Promise<GapFilmResponse> {
    let url = `${this.siteBaseUrl}EntityId=${entityId}&&PageSize=${pageSize}&&{PageIndex=${pageIndex}}`;
    try {
      const headers = {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'fa',
        Origin: 'https://www.gapfilm.ir',
        Priority: 'u=1, i',
        Referer: 'https://www.gapfilm.ir/',
        'Sec-Ch-Ua':
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Sourcechannel: 'GF_WEBSITE',
        Sourceenvironment: 'Website',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      };

      const response = await this.httpService.axiosRef.get(url, { headers });
      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log('error in get request', err);
    }
  }

  private getMovieSummery(movieData) {}
}
