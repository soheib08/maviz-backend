import { load, CheerioAPI } from 'cheerio';
import { IDataExtractor } from 'src/core/interfaces/crawler/data-extractor.interface';
interface MetaData {
  label: string;
  value: string;
}
export class DigiDataExtractor implements IDataExtractor {
  doc: CheerioAPI;

  loadData(data: any): void {
    this.doc = load(data);
  }

  getPaginationUrlList(): string[] {
    let paginationUrls = new Array<string>();
    this.doc('.page-numbers').each((index, element) => {
      paginationUrls.push(this.doc(element).attr('href'));
    });
    return paginationUrls;
  }

  getPaginationUrlMovieList(): string[] {
    let movieUrls = new Array<string>();

    this.doc('.item_small_loop  a').each((index, element) => {
      const movieUrl = this.doc(element).attr('href');
      movieUrls.push(movieUrl);
    });
    return movieUrls;
  }

  getMovieTitle(): string {
    let movieTitle = '';
    this.doc('.head_meta h1').each((index, element) => {
      movieTitle = this.doc(element).html();
    });
    return movieTitle;
  }

  private getMetaFromAllMetaData(token: string): MetaData {
    let data: MetaData[] = [];
    this.doc('.meta_item li').each((index, element) => {
      const labItem = this.doc(element).children('.lab_item').text().trim();
      let resItemText = '';
      //   console.log('lab', labItem);

      const resItem = this.doc(element).children('.res_item');

      if (resItem.length > 0) {
        const resItemLinks = resItem.find('a');
        if (resItemLinks.length > 0) {
          resItemLinks.each((linkIndex, linkElement) => {
            resItemText += this.doc(linkElement).text().trim() + ', ';
          });
          //   console.log('after', resItemText);

          resItemText = resItemText.slice(0, -2); // Remove trailing comma and space
          /// console.log('after2', resItemText);
        } else {
          resItemText = resItem.text().trim();
        }
      }

      const metaData: MetaData = {
        label: labItem,
        value: resItemText,
      };

      if (labItem.includes(token) || resItemText.includes(token)) {
        data.push(metaData);
      }
    });

    // console.log('on meta=====', data);
    return data[0] ? data[0] : null;
  }

  getMovieGenres(): string[] {
    let movieGenres = new Array<string>();
    let genres = this.getMetaFromAllMetaData('ژانر');
    let genreArray = genres.value.split(',');
    genreArray.forEach((e) => {
      movieGenres.push(e);
    });
    //console.log(movieGenres);

    return movieGenres;
  }

  getMovieIMScore(): string {
    let movieImdbScore = '';
    this.doc('.imdb_holder_single  strong').each((index, element) => {
      movieImdbScore = this.doc(element).html();
    });

    return movieImdbScore;
  }

  getMovieRottenScore(): string {
    let rottenTitle = '';
    this.doc('.bottom_sec_single strong').each((index, element) => {
      rottenTitle = this.doc(element).html();
    });

    return rottenTitle;
  }

  getMovieLanguages(): string[] {
    let movieLanguages = new Array<string>();
    // let languages = this.getMetaFromAllMetaData('کیفیت');
    // let temp = languages.value.split(',');
    // temp.forEach((e) => {
    //   movieLanguages.push(e);
    // });
    // console.log('here', movieLanguages);

    return movieLanguages;
  }

  getMovieQualities(): string[] {
    let movieQualities = new Array<string>();
    let qualities = this.getMetaFromAllMetaData('کیفیت');
    let temp = qualities.value.split(',');
    temp.forEach((e) => {
      movieQualities.push(e);
    });
    return movieQualities;
  }

  getMovieCountries(): string[] {
    let countries = new Array<string>();
    let extracted = this.getMetaFromAllMetaData('محصول کشور');
    let temp = extracted.value.split(',');
    temp.forEach((e) => {
      countries.push(e);
    });
    // console.log('here', countries);
    return countries;
  }

  getMovieStars(): string[] {
    let stars = new Array<string>();
    let extractedStars = this.getMetaFromAllMetaData('ستارگان');
    let temp = extractedStars.value.split(',');
    temp.forEach((e) => {
      stars.push(e);
    });
    // console.log('here', stars);

    return stars;
  }

  getMovieDirectors(): string[] {
    let movieDirectors = new Array<string>();
    let extractedDirector = this.getMetaFromAllMetaData('کارگردان');
    let temp = extractedDirector.value.split(',');
    temp.forEach((e) => {
      movieDirectors.push(e);
    });
    //  console.log('here', movieDirectors);

    return movieDirectors;
  }

  getMoviePosters(): string[] {
    let moviePosters = new Array<string>();
    this.doc('.inner_cover  img').each((index, element) => {
      let foundSrc = element.attributes.find((attr) => {
        return attr.name === 'src';
      });
      moviePosters.push(foundSrc.value);
    });

    return moviePosters;
  }

  getMovieDownloadLinks(): string[] {
    let downloadLinks = new Array<string>();
    this.doc('.itemdl .btn_dl').each((index, element) => {
      const movieDownloadUrl = this.doc(element).attr('href');
      if (movieDownloadUrl.includes('.mkv')) {
        downloadLinks.push(movieDownloadUrl);
      }
    });

    return downloadLinks;
  }

  getMovieDescription(): string {
    let movieDescription = '';
    this.doc('.plot_text').each((index, element) => {
      movieDescription = this.doc(element).html();
    });
    return movieDescription;
  }

  getMovieDate(): string {
    let movieDate = '';
    let stars = new Array<string>();
    this.doc('.actor_meta h3').each((index, element) => {
      stars.push(this.doc(element).html());
    });

    // console.log('===============stars', stars);

    return movieDate;
  }

  getMovieVideoLinks(): string[] {
    let videoLinks = new Array<string>();
    // this.doc('source').each((index, element) => {
    //   let videoLink = this.doc(element).attr('src');
    //   videoLinks.push(videoLink);
    // });
    return videoLinks;
  }
}
