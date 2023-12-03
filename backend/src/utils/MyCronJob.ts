import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Site} from '../models';
import {SiteRepository} from '../repositories';
import {processWebsite} from './cheerioHelper';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(@repository(SiteRepository) public websiterepo: SiteRepository) {
    super({
      name: 'job-B',
      onTick: async () => {
        let websites: Site[] = await websiterepo.find();
        console.log(new Date());
        websites.forEach(async website => {
          console.log(website);
          try {
            const result = await processWebsite(website);
            console.log('Datos extraidos desde la pagina: ', result);
          } catch (error) {
            console.error(error);
          }
        });
      },
      cronTime: `*/10 * * * * *`,
      start: true,
    });
  }
}
