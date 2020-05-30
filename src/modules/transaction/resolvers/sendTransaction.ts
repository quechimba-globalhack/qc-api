import { Resolver, Mutation, Arg, Query } from "type-graphql";
import {
  EosioService,
  EosioTransactionData,
  RpcProcessedResponse,
} from "./eosio";
import { createEosioConfiguration } from "../../../configuration/eosio";

const config = createEosioConfiguration();

@Resolver()
export class SendTransactionResolver {
  private eosioService: EosioService = new EosioService(config.get("url"));

  @Query((type) => String)
  async quechimba(): Promise<string> {
    return "Que chimba de app!!";
  }
  @Mutation((returns) => RpcProcessedResponse)
  async sendTransaction(
    @Arg("data") data: EosioTransactionData,
    @Arg("user") user: string
  ): Promise<RpcProcessedResponse> {
    try {
      // if (user.length === 0) {
      //   throw new Error("User is required to sign the transaction");
      // }
      // if (this.validate(data)) {
      //   throw new Error("validation error");
      // }

      // use cases can only be executed with transactions
      // return this.eosioService.sendTransaction(data);
      throw "";
    } catch {
      throw new Error("transaction error");
    }
  }

  validate(data: EosioTransactionData) {
    return data.name.length !== 0 && data.hexData.length !== 0;
  }
}
/*
[[eosio::action]] void expublish(
      const name owner, const Hash& content, const Date& start_exp,
      const uint32_t& places, const uint64_t& baseprice );

  // auction start
  [[eosio::action]] void atnstart(
      const name owner, const uint64_t& expid, const Date& start_date );
  // auction request cancel
  [[eosio::action]] void atnrqcancel( const name owner, const id auction ) const;
  // auction reveal
  [[eosio::action]] void atnreveal( const name owner, const id auction ) const;
  // auction subscribe
  [[eosio::action]] void expsubscribe( const name bkn, const uint64_t& expid );
  // auction bid
  [[eosio::action]] void atnbid( const name bkn, const float price, const id );
  // bakan basic register
  [[eosio::action]] void usrregister(
      const name user, const string& name, const string& surname, uint8_t& role );
  // Action to delete data, just for dev
  [[eosio::action]] void deletedata();

  // ******* READ ONLY ACTIONS ********
  [[eosio::action]] uint32_t calcengexp(
      const uint64_t idexp, const uint32_t& places );
      */