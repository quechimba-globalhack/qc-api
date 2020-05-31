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
import { JsonRpc } from "eosjs";
import { Experience } from "../domain/experience";
import { LukasResolver } from "../../lukas/resolvers/lukas";
const fetch = require("node-fetch");

@Resolver(Experience)
export class ExperienceResolver {
  @Query((returns) => Experience)
  public async getExperience(
    @Arg("expid", (type) => Int) expid: number
  ): Promise<Experience | null> {
    const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });

    const expResult = await rpc.get_table_rows({
      json: true, // Get the response as json
      code: "qccontract", // Contract that we target
      scope: "qccontract", // Account that owns the data
      table: "exp", // Table name
      limit: 1, // Maximum number of rows that we want to get
      lower_bound: expid,
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });

    if (!expResult.rows.length) {
      return null;
    }
    let exp = expResult.rows[0];

    const actnResult = await rpc.get_table_rows({
      json: true, // Get the response as json
      code: "qccontract", // Contract that we target
      scope: "qccontract", // Account that owns the data
      table: "actn", // Table name
      table_key: "byexp",
      limit: 1, // Maximum number of rows that we want to get
      lower_bound: exp.exp_id,
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });

    if (actnResult.rows.length) {
      const actn = actnResult.rows[0];

      exp = {
        ...exp,
        ...{
          actn: {
            ...actn,
            ...{
              start_date: new Date(actn.start_date),
              created_at: new Date(actn.created_at),
              start_value: LukasResolver.parseBalance(actn.start_value),
              highest_bid: LukasResolver.parseBalance(actn.highest_bid),
            },
          },
        },
      };
    } else {
      exp = {
        ...exp,
        ...{ actn: null },
      };
    }

    return {
      ...exp,
      ...{
        start_date: new Date(exp.start_date),
        maxactntdate: new Date(exp.maxactntdate),
        pub_price: LukasResolver.parseBalance(exp.pub_price),
        base_val: LukasResolver.parseBalance(exp.base_val),
      },
    };
  }
}
