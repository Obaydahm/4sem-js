const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
import { bcryptAsync, bcryptCheckAsync } from "../utils/bcrypt-async-helper"
const ApiError = require('../errors/ApiError')
const UserError = require('../errors/UserError')
const debug = require("debug")("game-project");

interface IGameUser { name: string, username: string, password: string, role: string }

function dummyReturnPromise<T>(val: T | null, err: string = "Unknown Error", code: number = 500): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if (!val) { reject(new ApiError(err, code)) }
            else resolve(val);
        }, 0);
    })
}


export default class UserFacade {
    public static users: Array<IGameUser> = [];

    static async addUser(user: IGameUser): Promise<String> {
        /*const { error } = this.validateUser(user);
        if (error) throw new UserError(error.details[0].message);
        const userExists = UserFacade.users.find(u => u.username === user.username);
        if (userExists) throw new Error("Username already exists!")
*/
        const hash = await bcryptAsync(user.password);
        let newUser = { ...user, password: hash }
        UserFacade.users.push(newUser);
        return dummyReturnPromise<String>("User was added");

        /*
        const { error } = this.validateUser(user);
        if (error) throw new Error(error.details[0].message);
        const userExists = users.find(u => u.username === user.username);
        if (userExists) throw new Error("Username already exists!")
        user.password = bcrypt.hashSync(user.password, 12);
        users.push(user);
        return true;*/
    }
    static async deleteUser(username: string): Promise<String> {
        UserFacade.users = UserFacade.users.filter(u => u.username != username)
        return dummyReturnPromise("User was deleted!");
        /*
        const user = UserFacade.users.find(u => u.username === username);
        if (!user) throw new Error(`User with email ${username} was not found.`);
        const index = UserFacade.users.indexOf(user);
        UserFacade.users.splice(index, 1);
        return true;*/
    }
    static async getAllUsers(): Promise<Array<IGameUser>> {
        return dummyReturnPromise(UserFacade.users);
    }
    static async getUser(username: string): Promise<IGameUser> {
        const user = UserFacade.users.find(u => u.username === username);
        if (!user) throw new Error(`User with email ${username} was not found.`);
        return dummyReturnPromise(user);
    }
    static checkUser(username: string, password: string): boolean {
        const user = UserFacade.users.find(u => u.username === username);
        if (!user || !bcrypt.compareSync(password, user.password)) throw new Error(`Username or password was incorrect.`);
        return true;
    }

    private static validateUser(user: IGameUser) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            username: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().min(3).required()
        })
        return schema.validate(user);
    }
}
/*
function main() {
    UserFacade.addUser({
        name: "Billy Willy",
        username: "billy@live.com",
        password: "password123",
        role: "user"
    })
    try {
        console.log("1.");
        console.log(UserFacade.checkUser("billy", "password123"))
    } catch (e) { console.log(e.message) }
    try {
        console.log("2.");
        console.log(UserFacade.checkUser("billy@live.com", "password"))
    } catch (e) { console.log(e.message) }
    try {
        console.log("3.");
        console.log(UserFacade.checkUser("billy@live.com", "password123"))
    } catch (e) { console.log(e.message) }
}
main()
*/