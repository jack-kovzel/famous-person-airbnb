import { GetPersonApplicationRequest } from '@app/appservices/GetPersonApplicationRequest';
import { GetPersonApplicationService } from '@app/appservices/GetPersonApplicationService';
import { GetPersonArgs } from '@app/models/GetPersonArgs';
import { PaginatedPersonsResponse } from '@app/models/PaginatedPersonsResponse';
import { PersonModel } from '@app/models/PersonModel';
import { Args, Query, Resolver, ReturnTypeFuncValue } from '@nestjs/graphql';

@Resolver()
export class PersonsResolver {
  constructor(
    private readonly applicationService: GetPersonApplicationService,
  ) {}

  @Query((): ReturnTypeFuncValue => PaginatedPersonsResponse)
  async all(@Args() args: GetPersonArgs): Promise<PaginatedPersonsResponse> {
    const [persons, totalCount] = await this.applicationService.resolve(
      GetPersonApplicationRequest.createByArgs(args),
    );

    return new PaginatedPersonsResponse(
      PersonModel.createManyFromDocument(persons),
      totalCount,
    );
  }
}
