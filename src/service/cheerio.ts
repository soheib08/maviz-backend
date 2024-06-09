import { load } from 'cheerio';

export const cheerio = (data: string) => {
  return load(data);
};
