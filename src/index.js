const {GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = {
    Query: {
        info: () => "This is the hackernews node API",
        feed: (root, args,context,info) => {
            return context.db.query.links({}, info);
        }
    },

    Mutation: {
        post:  (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                }
            }, info);
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/ngugi-ndungu-ca026f/graphql-step-by-step-prismadb/practice',
          secret: 'graphql-step-by-step',
          debug: true,
        }),
      }),
});

server.start(function () {console.log("Server is running on port 4000");});