import { AbstractIndexDocumentId } from '@app/value_objects/AbstractIndexDocumentId';

export interface IndexDocumentInterface {
  getId(): AbstractIndexDocumentId;
  toJSON(): Record<string, unknown>;
}
