import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Visit, VisitRelations} from '../models';

export class VisitRepository extends DefaultCrudRepository<
  Visit,
  typeof Visit.prototype.id,
  VisitRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Visit, dataSource);
  }
}
