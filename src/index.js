const {GraphQLServer } = require('graphql-yoga');
const resolvers = {
    Query: {
        info: () => {
            return {
                url: "http://localhost",
                description: "Sample"
            };
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log("Server is running on port 4000"));