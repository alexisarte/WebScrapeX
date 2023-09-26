import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Site, SiteRelations} from '../models';

export class SiteRepository extends DefaultCrudRepository<
  Site,
  typeof Site.prototype.id,
  SiteRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Site, dataSource);
  }
}
