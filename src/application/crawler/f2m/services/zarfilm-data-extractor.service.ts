import { CheerioAPI } from 'cheerio';
import { IDataExtractor } from 'src/core/interfaces/data-extractor.interface';
import { cheerio } from 'src/service/cheerio';

export class ZarFilmDataExtractor implements IDataExtractor {
  doc: CheerioAPI;
  constructor() {}

  loadData(data: any): void {
    this.doc = cheerio(data);
  }

  getPaginationUrlList(): string[] {
    let paginationUrls = new Array<string>();
    this.doc('.page-numbers').each((index, element) => {
      paginationUrls.push(this.doc(element).attr('href'));
    });
    return paginationUrls.filter((url) => url !== undefined) as string[];
  }

  getPaginationUrlMovieList(): string[] {
    let movieUrls = new Array<string>();

    this.doc('.item_body_widget .bgbackitem').each((index, element) => {
      const movieUrl = this.doc(element).attr('href');
      movieUrls.push(movieUrl);
    });
    return movieUrls;
  }

  getMovieTitle(): string {
    let movieTitle = '';
    this.doc('.title_single .mobile').each((index, element) => {
      movieTitle = this.doc(element).html();
    });
    return movieTitle;
  }

  getMovieGenres(): string[] {
    let movieGenres = new Array<string>();
    this.doc('.genres_holder_single h3 a').each((index, element) => {
      let genre = this.doc(element).html();
      movieGenres.push(genre);
    });
    return movieGenres;
  }

  getMovieIMScore(): string {
    const ratingElement = this.doc('.item.imdb .top strong');
    const rating = ratingElement.text().trim();

    return rating;
  }

  getMovieRottenScore(): string {
    return '';
  }

  getMovieLanguages(): string[] {
    return [];
  }

  getMovieQualities(): string[] {
    let movieQualities = new Array<string>();
    // this.doc('.m-quality  .val').each((index, element) => {
    //   let qualityItem = this.doc(element).html();
    //   movieQualities.push(qualityItem);
    // });

    return movieQualities;
  }

  getMovieCountries(): string[] {
    let countries = new Array<string>();
    // this.doc('.m-country  .val').each((index, element) => {
    //   let countryItem = this.doc(element).html();
    //   countries.push(countryItem);
    // });
    return countries;
  }

  getMovieStars(): string[] {
    let stars = new Array<string>();
    this.doc('.stars').each((_, element) => {
      const label = this.doc(element).find('.label span').text().trim();

      if (label.includes('ستارگان')) {
        this.doc(element)
          .find('.list .item a')
          .each((_, star) => {
            stars.push(this.doc(star).text().trim());
          });
      }
    });
    return stars;
  }

  getMovieDirectors(): string[] {
    let movieDirectors = new Array<string>();
    this.doc('.stars').each((_, element) => {
      const label = this.doc(element).find('.label span').text().trim();
      if (label.includes('کارگردان')) {
        this.doc(element)
          .find('.list .item a')
          .each((_, director) => {
            movieDirectors.push(this.doc(director).text().trim());
          });
      }
    });
    return movieDirectors;
  }

  getMoviePosters(): string[] {
    let moviePosters = new Array<string>();
    this.doc('.cover_holder img').each((_, element) => {
      const srcset =
        this.doc(element).attr('data-lazy-srcset') ||
        this.doc(element).attr('srcset');
      if (srcset) {
        const urls = srcset.split(',').map((src) => src.trim().split(' ')[0]);
        moviePosters.push(...urls.filter((src) => src.endsWith('.jpg')));
      }
    });

    return moviePosters;
  }

  getMovieDownloadLinks(): string[] {
    let downloadLinks = new Array<string>();
    this.doc('.item_dllink_box a').each((index, element) => {
      const movieDownloadUrl = this.doc(element).attr('href');
      if (
        movieDownloadUrl.includes('.mkv') ||
        movieDownloadUrl.includes('.mp4')
      ) {
        downloadLinks.push(movieDownloadUrl);
      }
    });

    return downloadLinks;
  }

  getMovieDescription(): string {
    let movieDescription = '';
    this.doc('.plot').each((index, element) => {
      movieDescription = this.doc(element).html();
    });

    return movieDescription;
  }

  getMovieDate(): string {
    let movieDate = '';
    const regex: RegExp = /\b\d{4}\b/;
    const matchResult: RegExpMatchArray | null =
      this.getMovieTitle().match(regex);

    if (matchResult) {
      movieDate = matchResult[0];
    }
    return movieDate;
  }

  getMovieVideoLinks(): string[] {
    let videoLinks = new Array<string>();

    return videoLinks;
  }
}
