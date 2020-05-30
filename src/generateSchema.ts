import { buildSchema } from "type-graphql";
import path = require('path')
import { SendTransactionResolver } from "./modules/transaction/resolvers/sendTransaction";

export const generateSchema = async () => {
  return await buildSchema({
    resolvers: [SendTransactionResolver],
    emitSchemaFile: path.resolve(__dirname, '../generatedSchema.graphql')
  })
}
