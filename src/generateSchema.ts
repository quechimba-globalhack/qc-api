import { buildSchema } from "type-graphql";
import path = require('path')
import { SendTransactionResolver } from "./modules/transaction/resolvers/sendTransaction";
import { QueChimbaResolver } from "./modules/quechimba/resolvers/quechimba";
import { ExperienceResolver } from "./modules/experience/resolvers/experience";
import { LukasResolver } from "./modules/lukas/resolvers/lukas";

export const generateSchema = async () => {
  return await buildSchema({
    resolvers: [SendTransactionResolver, QueChimbaResolver, ExperienceResolver, LukasResolver],
    emitSchemaFile: path.resolve(__dirname, '../generatedSchema.graphql')
  })
}
