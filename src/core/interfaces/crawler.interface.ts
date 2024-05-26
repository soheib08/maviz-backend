export interface ICrawler {
  crawlPaginationUrl(url: string);
  crawlMovieUrl(movieUrl: string);
  getUrlData(url: string);
  getMovieInformation(url: string);
}
