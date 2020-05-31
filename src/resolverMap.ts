import { IResolvers } from "graphql-tools";

const resolverMap: IResolvers = {
  Query: {
    quechimba(_: void, args: void): string {
      return `👋 Que chimba de api!! 👋`;
    },
  },
};

export default resolverMap;
