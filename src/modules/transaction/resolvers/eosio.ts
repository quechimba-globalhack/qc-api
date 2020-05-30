import { JsonRpc, Api } from "eosjs";
import { ObjectType, Field, ID, ArgsType, InputType } from "type-graphql";
import { hexToUint8Array, arrayToHex } from "eosjs/dist/eosjs-serialize";
const fetch = require("node-fetch");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const { TextEncoder, TextDecoder } = require("util");

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
  private api: Api;
  async sendTransaction(
    data: EosioTransactionData
  ): Promise<RpcProcessedResponse> {
    try {
      const debugOnlyTransaction = this.api.deserializeTransactionWithActions(
        data.hexData
      );
      console.debug('[[ACTION-DATA]]', debugOnlyTransaction);

      const { processed } = await this.rpc.push_transaction({
        signatures: [data.signature],
        serializedTransaction: hexToUint8Array(data.hexData),
      });

      return {
        hash: processed.id,
        blockNumber: processed.block_number,
        timestamp: new Date(processed.block_time),
        error: null,
      };
    } catch {
      throw new Error("Method not implemented.");
    }
  }
  constructor(url: string) {
    this.rpc = new JsonRpc(url, { fetch });
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: new JsSignatureProvider([]),
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }
}