import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Site,
} from '../models';
import {UserRepository} from '../repositories';

export class UserSiteController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/sites', {
    responses: {
      '200': {
        description: 'Array of User has many Site',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Site)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Site>,
  ): Promise<Site[]> {
    return this.userRepository.sites(id).find(filter);
  }

  @post('/users/{id}/sites', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Site)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSiteInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) site: Omit<Site, 'id'>,
  ): Promise<Site> {
    return this.userRepository.sites(id).create(site);
  }

  @patch('/users/{id}/sites', {
    responses: {
      '200': {
        description: 'User.Site PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Partial<Site>,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.userRepository.sites(id).patch(site, where);
  }

  @del('/users/{id}/sites', {
    responses: {
      '200': {
        description: 'User.Site DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.userRepository.sites(id).delete(where);
  }
}
