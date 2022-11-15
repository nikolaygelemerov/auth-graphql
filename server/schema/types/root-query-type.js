import { GraphQLObjectType } from 'graphql';

import { UserType } from './user-type';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    }
  })
});
