import { Field, Int, ObjectType, ReturnTypeFuncValue } from '@nestjs/graphql';

export default function PaginatedResponse<TItem>(
  TItemClass: TItem,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): InstanceType<any> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field((): ReturnTypeFuncValue => Int)
    readonly totalCount: number;

    @Field((): ReturnTypeFuncValue => [TItemClass])
    readonly items: TItem[];

    protected constructor(items: TItem[], totalCount: number) {
      this.items = items;
      this.totalCount = totalCount;
    }
  }

  return PaginatedResponseClass;
}
