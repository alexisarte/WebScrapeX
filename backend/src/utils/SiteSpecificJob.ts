import {Site} from '../models';
import {CronJob, cronJob} from '@loopback/cron';
import {processWebsite} from './cheerioHelper';

const fetch = require('node-fetch');

@cronJob()
export class SiteSpecificJob extends CronJob {
  constructor(site: Site) {
    super({
      name: site.name,
      onTick: async () => {
        const createVisite = async (site: Site) => {
          console.log('Hijooooooooooooooooooooooooooooo');
          const result = await processWebsite(site);
          console.log('Datos extraidos desde la pagina: ', result);
          const segmentos = site.url.split("/");
          const nombreDocumento = segmentos.pop();
          const visite = {
            name: nombreDocumento,
            url: site.url,
            extractor: site.extractor,
            document: result,
            siteId: site.id,
          }
          fetch('http://localhost:3000/visits', {
            method: 'POST',
            body: JSON.stringify(visite),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (visite.document.enlaces) {
            visite.document.enlaces.forEach((link: string) => {
              const newSite = Object.assign({}, site);
              newSite.url = link;
              createVisite(newSite);
            });
          }
        };
        
        createVisite(site);
      },
      cronTime: `*/${site.frequency} * * * * *`,
      start: true,
    });
  }
}
