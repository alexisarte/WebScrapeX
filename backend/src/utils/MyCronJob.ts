import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Site} from '../models';
import {SiteRepository} from '../repositories';
import {processWebsite} from './cheerioHelper';
import { SiteSpecificJob } from './SiteSpecificJob';

const fetch = require('node-fetch');

@cronJob()
export class MyCronJob extends CronJob {
  private siteJobs: SiteSpecificJob[];

  constructor(@repository(SiteRepository) public websiterepo: SiteRepository) {
    super({
      name: 'job-B',
      onTick: async () => {
        if (!this.siteJobs) {
          this.siteJobs = [];
          let websites: Site[] = await websiterepo.find();

          for (const website of websites) {
            const siteJob = new SiteSpecificJob(website);
            this.siteJobs.push(siteJob);
          }
        }
        console.log('----------------------------------');
        console.log('Padreeeeeeeeeeeeeeeeeeeeeeee');
        console.log(new Date());
      },
      cronTime: `*/10 * * * * *`,
      start: true,
    });
  }
}
