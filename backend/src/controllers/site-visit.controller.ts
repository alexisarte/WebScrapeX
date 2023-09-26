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
  Site,
  Visit,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteVisitController {
  constructor(
    @repository(SiteRepository) protected siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/visits', {
    responses: {
      '200': {
        description: 'Array of Site has many Visit',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visit)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visit>,
  ): Promise<Visit[]> {
    return this.siteRepository.visits(id).find(filter);
  }

  @post('/sites/{id}/visits', {
    responses: {
      '200': {
        description: 'Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visit)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visit, {
            title: 'NewVisitInSite',
            exclude: ['id'],
            optional: ['siteId']
          }),
        },
      },
    }) visit: Omit<Visit, 'id'>,
  ): Promise<Visit> {
    return this.siteRepository.visits(id).create(visit);
  }

  @patch('/sites/{id}/visits', {
    responses: {
      '200': {
        description: 'Site.Visit PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visit, {partial: true}),
        },
      },
    })
    visit: Partial<Visit>,
    @param.query.object('where', getWhereSchemaFor(Visit)) where?: Where<Visit>,
  ): Promise<Count> {
    return this.siteRepository.visits(id).patch(visit, where);
  }

  @del('/sites/{id}/visits', {
    responses: {
      '200': {
        description: 'Site.Visit DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visit)) where?: Where<Visit>,
  ): Promise<Count> {
    return this.siteRepository.visits(id).delete(where);
  }
}
