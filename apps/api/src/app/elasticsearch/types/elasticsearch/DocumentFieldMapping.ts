import { estypes } from '@elastic/elasticsearch';

export type DocumentFieldMapping = Record<
  estypes.PropertyName,
  estypes.MappingProperty
>;
