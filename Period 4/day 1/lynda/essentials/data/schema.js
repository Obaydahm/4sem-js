import { resolvers } from "./resolvers";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
    
    enum Gender {
        MALE
        FEMALE
    }

    type Contact {
        firstname: String
    }

    type Friend {
        id: ID
        firstname: String
        lastname: String
        gender: Gender
        age: Int
        language: String
        email: String
        contacts: [Contact]
    }

    type Query {
        getFriend(id: ID): Friend
        allFriends : [Friend]!
    }

    input ContactInput {
        firstname: String
    }

    input FriendInput {
        id: ID
        firstname: String!
        lastname: String
        gender: Gender
        age: Int
        language: String
        email: String
        contacts: [ContactInput]
    }

    type Mutation {
        createFriend(input: FriendInput): Friend
        updateFriend(input: FriendInput): Friend
        deleteFriend(id: ID!): String
    }
`;

const schema = makeExecutableSchema({typeDefs, resolvers})

export {schema};