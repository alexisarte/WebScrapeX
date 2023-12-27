import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, Site} from '../models';
import {SiteRepository} from './site.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly sites: HasManyRepositoryFactory<Site, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SiteRepository') protected siteRepositoryGetter: Getter<SiteRepository>,
  ) {
    super(User, dataSource);
    this.sites = this.createHasManyRepositoryFactoryFor('sites', siteRepositoryGetter,);
    this.registerInclusionResolver('sites', this.sites.inclusionResolver);
  }
}
