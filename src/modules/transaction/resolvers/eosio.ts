import { JsonRpc } from "eosjs";
import { ObjectType, Field, ID, ArgsType, InputType } from "type-graphql";
const fetch = require("node-fetch");

// Move this file to a folder that actually make sence like /services
@ObjectType()
export class RpcProcessedResponse {
  @Field()
  hash: string;
  @Field()
  blockNumber: number;
  @Field()
  timestamp: Date;
  error: Error | null;
}
export class EosioAuthData {
  author: string;
  permissions: string;
}

@InputType()
export class EosioTransactionData {
  @Field((type) => ID)
  name: string;
  @Field()
  signature: string;
  @Field()
  hexData: string;
}

export class EosioService {
  private rpc: JsonRpc;
  async sendTransaction(
    data: EosioTransactionData
  ): Promise<RpcProcessedResponse> {
    try {
      // const { processed } = await this.rpc.push_transaction({
      //   signatures: [data.signature],
      //   serializedTransaction: data.hexData,
      // });

      return {
        hash: '', // processed.id,
        blockNumber: 1, // processed.block_number,
        timestamp: new Date(), //processed.block_time),
        error: null,
      };
    } catch {
      throw new Error("Method not implemented.");
    }
  }
  constructor(url: string) {
    this.rpc = new JsonRpc(url, { fetch });
  }
}