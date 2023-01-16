import { Module } from "@nestjs/common";
import { default as SERVICES } from "./services";
import { default as RESOLVERS } from "./resolvers";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";

@Module({
  imports: [
     GraphQLModule.forRoot({
       driver: ApolloDriver,
       autoSchemaFile: 'autogenerated/schema.gql'
    })
  ],
  controllers: [],
  providers: [
    ...SERVICES,
    ...RESOLVERS,
  ],
})
export class AppModule {}
