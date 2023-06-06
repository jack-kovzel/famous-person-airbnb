import { AbstractIndexDocumentId } from '@app/value_objects/AbstractIndexDocumentId';

type WithIdType = {
  getId(): AbstractIndexDocumentId;
};

export type IdType<T extends WithIdType> = ReturnType<T['getId']>;
