import * as cheerio from 'cheerio';
import { Site } from '../models';
const fetch = require('node-fetch');

export async function processWebsite(site: Site) {
  if (!site.url) {
    throw new Error('No URL for site');
  }
  if (!site.extractor) {
    throw new Error('No extractor for site');
  }
  
  const response = await fetch(site.url);
  const body = await response.text();
  const instanciaCheerio = cheerio.load(body);
  const fn = eval(site.extractor);
  const pageResolver = eval(site.pageResolver);
  return fn(instanciaCheerio, pageResolver);
}