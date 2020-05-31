import { ObjectType, Field, Float } from "type-graphql";

@ObjectType()
export class Lukas {
  @Field((type) => Float, { nullable: true })
  balance: number | null;
}
