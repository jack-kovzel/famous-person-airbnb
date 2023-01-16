import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { FamousPersonModel } from "../models/famousPersonModel";

@Resolver()
export class FamousPersonResolver {
  @Query(() => FamousPersonModel)
  async all(): Promise<FamousPersonModel> {
    return new FamousPersonModel();
  }

  @Mutation(() => FamousPersonModel)
  async create(): Promise<FamousPersonModel> {
    return new FamousPersonModel()
  }
}
