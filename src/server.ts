import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import cors from 'cors';
import schema from './schema';
import db from './models';

const app = express();

const server = new ApolloServer({
  schema,
  context: { db },
});

app.use('*', cors());

server.applyMiddleware({ app, path: '/graphql' });

db.sequelize.sync().then(() => {
    const httpServer = createServer(app);
    httpServer.listen(
        { port: 3000 },
        (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
    );
})