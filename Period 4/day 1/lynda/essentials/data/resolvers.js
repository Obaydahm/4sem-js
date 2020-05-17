import mongoose from "mongoose";
import { Friends } from "./dbConnectors";

//resolver map
export const resolvers = {
    Query: {
        getFriend: ({ id }) => {
            return new Friend(id, friendDatabase[id]);
        },
        allFriends: () => {
            return Friends.find({})
        }
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstname: input.firstname,
                lastname: input.lastname,
                gender: input.gender,
                age: input.age,
                language: input.langauge,
                email: input.email,
                contacts: input.contacts,
            });
            newFriend.id = newFriend._id;
            return newFriend.save();
        },
        updateFriend: (root, { input }) => {
            return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true })
        },
        deleteFriend: async (root, { id }) => {
            const deletedFriend = await Friends.findOneAndDelete({ _id: id });
            return "Deleted"
        }
    },
};