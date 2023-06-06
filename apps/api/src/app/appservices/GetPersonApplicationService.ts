import { GetPersonApplicationRequest } from '@app/appservices/GetPersonApplicationRequest';
import { FamousPersonDocument } from '@app/elasticsearch/documents/FamousPersonDocument';
import { FamousPersonDocumentRepositoryService } from '@app/elasticsearch/repository/FamousPersonDocumentRepositoryService';
import { PaginationCalculatorService } from '@app/services/PaginationCalculatorService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPersonApplicationService {
  constructor(
    private readonly famousPersonDocumentRepositoryService: FamousPersonDocumentRepositoryService,
    private readonly paginationCalculatorService: PaginationCalculatorService,
  ) {}

  async resolve(
    request: GetPersonApplicationRequest,
  ): Promise<[readonly FamousPersonDocument[], number]> {
    const { filterBy, pagination } = request;

    const paginationResult = await this.paginationCalculatorService.calculate({
      pagination,
    });

    const [persons, totalCount] =
      await this.famousPersonDocumentRepositoryService.findMany({
        filterBy,
        paginationResult,
      });

    return [persons, totalCount];
  }
}
