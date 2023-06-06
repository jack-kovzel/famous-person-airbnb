import { IndexDocumentInterface } from '@app/elasticsearch/interfaces/IndexDocumentInterface';
import { Type } from '@nestjs/common';

export interface IndexDocumentType<T extends IndexDocumentInterface>
  extends Type<T> {
  createFromSource(id: string, json: Record<string, unknown>): T;
}
