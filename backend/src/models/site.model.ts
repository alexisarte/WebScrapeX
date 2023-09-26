import {Entity, model, property, hasMany} from '@loopback/repository';
import {Visit} from './visit.model';

@model({settings: {strict: false}})
export class Site extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'number',
    required: true,
  })
  maxDepth: number;

  @property({
    type: 'number',
    required: true,
  })
  frequency: number;
  
  @property({
    type: 'string',
    required: true,
  })
  extractor: string;
  
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Visit)
  visits: Visit[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Site>) {
    super(data);
  }
}

export interface SiteRelations {
  // describe navigational properties here
}

export type SiteWithRelations = Site & SiteRelations;
