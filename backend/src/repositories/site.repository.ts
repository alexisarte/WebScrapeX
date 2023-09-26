import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Site, SiteRelations, Visit} from '../models';
import {VisitRepository} from './visit.repository';

export class SiteRepository extends DefaultCrudRepository<
  Site,
  typeof Site.prototype.id,
  SiteRelations
> {

  public readonly visits: HasManyRepositoryFactory<Visit, typeof Site.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VisitRepository') protected visitRepositoryGetter: Getter<VisitRepository>,
  ) {
    super(Site, dataSource);
    this.visits = this.createHasManyRepositoryFactoryFor('visits', visitRepositoryGetter,);
    this.registerInclusionResolver('visits', this.visits.inclusionResolver);
  }
}
