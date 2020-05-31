import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Args,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import { JsonRpc } from "eosjs"
const fetch = require("node-fetch");

@ObjectType()
export class QueChimba {
  @Field()
  quechimba: string;
}

@Resolver()
export class QueChimbaResolver {

  @Query((type) => [QueChimba])
  async queChimba(
    @Arg("count", (type) => Int) count: number
  ): Promise<QueChimba[]> {

    const result: Array<QueChimba> = [];
    for (let i = 0; i < count; i++) {
      result.push({ quechimba: `Que chimba de app ${i}` });
    }

    return Promise.resolve(result);
  }
}
