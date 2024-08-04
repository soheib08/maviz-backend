import { load, CheerioAPI } from 'cheerio';
import { IDataExtractor } from 'src/core/interfaces/crawler/data-extractor.interface';
import * as jalaliMoment from 'jalali-moment';

export class F2MDataExtractor implements IDataExtractor {
  doc: CheerioAPI;

  loadData(data: any): void {
    this.doc = load(data);
  }

  getPaginationUrlList(): string[] {
    let paginationUrls = new Array<string>();
    this.doc('.page-number a').each((index, element) => {
      paginationUrls.push(this.doc(element).attr('href'));
    });
    return paginationUrls;
  }

  getPaginationUrlMovieList(): string[] {
    let movieUrls = new Array<string>();

    this.doc('.m-helper  a').each((index, element) => {
      const movieUrl = this.doc(element).attr('href');
      movieUrls.push(movieUrl);
    });
    return movieUrls;
  }

  getMovieTitle(): string {
    let movieTitle = '';
    this.doc('.m-title a').each((index, element) => {
      movieTitle = this.doc(element).html();
    });
    return movieTitle;
  }

  getMovieGenres(): string[] {
    let movieGenres = new Array<string>();
    this.doc('.m-genres  .val a').each((index, element) => {
      let genre = this.doc(element).html();
      movieGenres.push(genre);
    });
    return movieGenres;
  }

  getMovieIMScore(): string {
    let movieImdbScore = '';
    this.doc('.imdb_row  .val').each((index, element) => {
      movieImdbScore = this.doc(element).html();
    });

    return movieImdbScore;
  }

  getMovieRottenScore(): string {
    let rottenTitle = '';
    this.doc('.meta_row .pt-1').each((index, element) => {
      rottenTitle = this.doc(element).html();
    });

    return rottenTitle;
  }

  getMovieLanguages(): string[] {
    let movieLanguages = new Array<string>();
    this.doc('.m-lang  .val').each((index, element) => {
      let movieLang = this.doc(element).html();
      movieLanguages.push(movieLang);
    });

    return movieLanguages;
  }

  getMovieQualities(): string[] {
    let movieQualities = new Array<string>();
    this.doc('.m-quality  .val').each((index, element) => {
      let qualityItem = this.doc(element).html();
      movieQualities.push(qualityItem);
    });

    return movieQualities;
  }

  getMovieCountries(): string[] {
    let countries = new Array<string>();
    this.doc('.m-country  .val').each((index, element) => {
      let countryItem = this.doc(element).html();
      countries.push(countryItem);
    });
    return countries;
  }

  getMovieStars(): string[] {
    let stars = new Array<string>();
    this.doc('.m-stars  .val').each((index, element) => {
      let starItem = this.doc(element).html();
      stars.push(starItem);
    });

    return stars;
  }

  getMovieDirectors(): string[] {
    let movieDirectors = new Array<string>();
    this.doc('.m-director  .val').each((index, element) => {
      let director = this.doc(element).html();
      movieDirectors.push(director);
    });

    return movieDirectors;
  }

  getMoviePosters(): string[] {
    let moviePosters = new Array<string>();
    this.doc('.movie .m_poster  img').each((index, element) => {
      let foundSrc = element.attributes.find((attr) => {
        return attr.name === 'src';
      });
      moviePosters.push(foundSrc.value);
    });

    return moviePosters;
  }

  getMovieDownloadLinks(): string[] {
    let downloadLinks = new Array<string>();
    this.doc('.m-content a').each((index, element) => {
      const movieDownloadUrl = this.doc(element).attr('href');
      if (movieDownloadUrl.includes('.mkv')) {
        downloadLinks.push(movieDownloadUrl);
      }
    });

    return downloadLinks;
  }

  getMovieDescription(): string {
    let movieDescription = '';
    this.doc('.m_plot  p').each((index, element) => {
      movieDescription = this.doc(element).html();
    });

    return movieDescription;
  }

  getMovieDate(): string {
    let movieDate = '';
    this.doc('.m-date  time').each((index, element) => {
      movieDate = this.doc(element).attr('datetime');
    });

    return movieDate;
  }

  getMovieVideoLinks(): string[] {
    let videoLinks = new Array<string>();
    this.doc('source').each((index, element) => {
      let videoLink = this.doc(element).attr('src');
      videoLinks.push(videoLink);
    });

    return videoLinks;
  }

  getPersianDate(persianDate: string) {
    const parts = persianDate.split(' ');

    const day = parseInt(parts[0], 10); // Convert day to an integer
    const monthName = parts[1]; // Persian month name
    const year = parseInt(parts[2], 10); // Convert year to an integer

    const month = persianMonthMapping[monthName]; // Map month name to number

    const formattedPersianDate = `${year}/${String(month).padStart(
      2,
      '0',
    )}/${String(day).padStart(2, '0')}`;

    const gregorianDate = jalaliMoment(
      formattedPersianDate,
      'jYYYY/jMM/jDD',
    ).format('YYYY-MM-DD');

    return gregorianDate;
  }
}

// Define a mapping of Persian month names to their numerical values
const persianMonthMapping = {
  فروردین: 1,
  اردیبهشت: 2,
  خرداد: 3,
  تیر: 4,
  مرداد: 5,
  شهریور: 6,
  مهر: 7,
  آبان: 8,
  آذر: 9,
  دی: 10,
  بهمن: 11,
  اسفند: 12,
};

// The Persian date as a string
