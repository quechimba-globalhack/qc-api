import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Lukas {
  @Field({ nullable: true })
  balance: string;
}
