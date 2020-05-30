import { Hash } from "crypto";

export class experience {
  id: BigInt;
  bakanId: string;
  content: Hash;
  startDate: Date;
  palces: number;
  baseValue: BigInt;
  maxAuctionDate: Date;
  engagement: number;
  publishPrice: number;
  sealed: boolean;
}