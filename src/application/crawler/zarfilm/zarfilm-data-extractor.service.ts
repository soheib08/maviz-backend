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
    let movieImdbScore = '';
    this.$('.imdb_row  strong').each((index, element) => {
      movieImdbScore = this.$(element).html();
    });

    return movieImdbScore;
  }

  getMovieRottenScore(): string {
    // let rottenTitle = '';
    // this.$('.meta_row .pt-1').each((index, element) => {
    //   rottenTitle = this.$(element).html();
    // });

    // return rottenTitle;

    return '';
  }

  getMovieLanguages(): string[] {
    let movieLanguages = new Array<string>();
    this.$('location ').each((index, element) => {
      let movieLang = this.$(element).html();
      movieLanguages.push(movieLang);
    });

    return movieLanguages;
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
    this.$('.single_casts a').each((index, element) => {
      let starItem = this.$(element).html();
      stars.push(starItem);
    });

    return stars;
  }

  getMovieDirectors(): string[] {
    let movieDirectors = new Array<string>();
    this.$('.m-director  .val').each((index, element) => {
      let director = this.$(element).html();
      movieDirectors.push(director);
    });

    return movieDirectors;
  }

  getMoviePosters(): string[] {
    let moviePosters = new Array<string>();
    this.$('.cover_holder  img').each((index, element) => {
      let foundSrc = element.attributes.find((attr) => {
        return attr.name === 'src';
      });
      moviePosters.push(foundSrc.value);
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
    this.$('profile_add').each((index, element) => {
      movieDate = this.$(element).attr('datetime');
    });

    return movieDate;
  }

  getMovieVideoLinks(): string[] {
    let videoLinks = new Array<string>();
    // this.$('source').each((index, element) => {
    //   let videoLink = this.$(element).attr('src');
    //   videoLinks.push(videoLink);
    // });

    return videoLinks;
  }
}
