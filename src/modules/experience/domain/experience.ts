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

@ObjectType()
export class Auction {
  @Field()
  actn_id: number;
  @Field()
  exp_id: number;
  @Field()
  start_date: Date;
  @Field()
  duration: number;
  @Field()
  start_value: string;
  @Field()
  highest_bid: number;
  @Field()
  bkn: string;
  @Field()
  req_cancel: number;
  @Field()
  created_at: Date;
}

@ObjectType()
export class Experience {
  @Field()
  exp_id: number;
  @Field()
  bkn_id: string;
  @Field()
  content: string;
  @Field()
  start_date: string;
  @Field()
  places: number;
  @Field()
  base_val: string;
  @Field()
  maxactntdate: Date;
  @Field()
  engagement: number;
  @Field()
  pub_price: number;
  @Field()
  sealed: number;
  @Field((type) => Auction)
  actn: Auction;
}
