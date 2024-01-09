//package imports
import express from"express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";

//File imports
import resolvers from "./graphql/resolvers.js";

// GLOBAL variable
const PORT = process.env.PORT || 8080;
const MONGODB_URI = "mongodb://localhost:27017/toDo";

const app = express();



// using bodyparser to parse req.body to json
app.use(bodyParser.json());

// middleware to add cors to the request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//graphql implementation with express and @apollo

const typeDefs = gql(
  readFileSync("./graphql/schema.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

await server.start();

app.use("/graphql", expressMiddleware(server));


// connecting to local mongodb and starting server
mongoose.connect(MONGODB_URI).then((rs) => {
  app.listen(PORT, () => {
    console.log(`server running at portt: ${PORT}`);
  });
});
