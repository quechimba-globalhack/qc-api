import { Query, Arg, Resolver, Float } from "type-graphql";
import { Lukas } from "../domain/lukas";
import { JsonRpc } from "eosjs";
const fetch = require("node-fetch");

@Resolver()
export class LukasResolver {
  @Query((returns) => Lukas)
  public async getBalace(@Arg("user") user: string): Promise<Lukas | null> {
    const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });
    const balanceResult = await rpc.get_currency_balance(
      "qctoken",
      user,
      "LKS"
    );
    let balance = balanceResult.length
      ? LukasResolver.parseBalance(balanceResult[0])
      : null;

    return {
      balance,
    };
  }

  public static parseBalance(balanceString: string): number | null {
    if (!balanceString.length) return null;
    const numberStr = balanceString.split(" ")[0];
    return Number(numberStr);
  }
}
