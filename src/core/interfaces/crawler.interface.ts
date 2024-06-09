import { IDataExtractor } from './data-extractor.interface';

export interface ICrawler {
  crawlPaginationUrl(url: string, dataExtractor: IDataExtractor);
  crawlMovieUrl(movieUrl: string, dataExtractor: IDataExtractor);
  getUrlData(url: string);
  getMovieInformation(url: string, dataExtractor: IDataExtractor);
}
