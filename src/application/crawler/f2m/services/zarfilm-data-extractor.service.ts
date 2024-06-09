import { load, CheerioAPI } from 'cheerio';
import { IDataExtractor } from 'src/core/interfaces/data-extractor.interface';

export class ZarFilmDataExtractor implements IDataExtractor {
  $: CheerioAPI;

  constructor(data: any) {
    this.$ = load(data);
  }

  getPaginationUrlList(): string[] {
    let paginationUrls = new Array<string>();
    this.$('.page-numbers').each((index, element) => {
      paginationUrls.push(this.$(element).attr('href'));
    });
    return paginationUrls.filter((url) => url !== undefined) as string[];
  }

  getPaginationUrlMovieList(): string[] {
    let movieUrls = new Array<string>();

    this.$('.item_body_widget .bgbackitem').each((index, element) => {
      const movieUrl = this.$(element).attr('href');
      movieUrls.push(movieUrl);
    });
    return movieUrls;
  }

  getMovieTitle(): string {
    let movieTitle = '';
    this.$('.title_single .mobile').each((index, element) => {
      movieTitle = this.$(element).html();
    });
    return movieTitle;
  }

  getMovieGenres(): string[] {
    let movieGenres = new Array<string>();
    this.$('.genres_holder_single h3 a').each((index, element) => {
      let genre = this.$(element).html();
      movieGenres.push(genre);
    });
    return movieGenres;
  }

  getMovieIMScore(): string {
    const ratingElement = this.$('.item.imdb .top strong');
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
    // this.$('.m-quality  .val').each((index, element) => {
    //   let qualityItem = this.$(element).html();
    //   movieQualities.push(qualityItem);
    // });

    return movieQualities;
  }

  getMovieCountries(): string[] {
    let countries = new Array<string>();
    // this.$('.m-country  .val').each((index, element) => {
    //   let countryItem = this.$(element).html();
    //   countries.push(countryItem);
    // });
    return countries;
  }

  getMovieStars(): string[] {
    let stars = new Array<string>();
    this.$('.stars').each((_, element) => {
      const label = this.$(element).find('.label span').text().trim();

      if (label.includes('ستارگان')) {
        this.$(element)
          .find('.list .item a')
          .each((_, star) => {
            stars.push(this.$(star).text().trim());
          });
      }
    });
    return stars;
  }

  getMovieDirectors(): string[] {
    let movieDirectors = new Array<string>();
    this.$('.stars').each((_, element) => {
      const label = this.$(element).find('.label span').text().trim();
      if (label.includes('کارگردان')) {
        this.$(element)
          .find('.list .item a')
          .each((_, director) => {
            movieDirectors.push(this.$(director).text().trim());
          });
      }
    });
    return movieDirectors;
  }

  getMoviePosters(): string[] {
    let moviePosters = new Array<string>();
    this.$('.cover_holder img').each((_, element) => {
      const srcset =
        this.$(element).attr('data-lazy-srcset') ||
        this.$(element).attr('srcset');
      if (srcset) {
        const urls = srcset.split(',').map((src) => src.trim().split(' ')[0]);
        moviePosters.push(...urls.filter((src) => src.endsWith('.jpg')));
      }
    });

    return moviePosters;
  }

  getMovieDownloadLinks(): string[] {
    let downloadLinks = new Array<string>();
    this.$('.item_dllink_box a').each((index, element) => {
      const movieDownloadUrl = this.$(element).attr('href');
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
    this.$('.plot').each((index, element) => {
      movieDescription = this.$(element).html();
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
