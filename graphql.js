 
const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const port = process.env.PORT || 4000;

const typeDefs = `
  union Result = Foo | Bar

  type Foo {
    foo: String
  }

  type Bar {
    bar: String
  }

  type Query {
    hello:  String
    result: [Result]
  }
`;

const resolvers = {
     Result: {
    __resolveType(obj, context, info){
      if(obj.foo){
        return 'Foo';
      }

      if(obj.bar){
        return 'Bar';
      }

      return null;
    },
  },
    Query: {
        hello: () => "world",
        result: () => {
          return [{ foo: 'asdf'}, {bar: 'dgdf'}]
        }
    }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema
});

server.listen({ port }).then(({url}) => {
  console.log(`GraphQL server running at ${url}`);
});