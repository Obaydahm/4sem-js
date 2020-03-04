const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
interface IGameUser { name: string, username: string, password: string, role: string }

const users: Array<IGameUser> = [];
export class UserFacade {
    static addUser(user: IGameUser): boolean {
        const { error } = this.validateUser(user);
        if (error) throw new Error(error.details[0].message);
        const userExists = users.find(u => u.username === user.username);
        if (userExists) throw new Error("Username already exists!")
        user.password = bcrypt.hashSync(user.password, 12);
        users.push(user);
        return true;
    }
    static deleteUser(username: string): boolean {
        const user = users.find(u => u.username === username);
        if (!user) throw new Error(`User with email ${username} was not found.`);
        const index = users.indexOf(user);
        users.splice(index, 1);
        return true;
    }
    static getAllUsers(): Array<IGameUser> {
        if (users.length < 1) throw new Error("No users has been created yet.");
        return users;
    }
    static getUser(username: string): IGameUser {
        const user = users.find(u => u.username === username);
        if (!user) throw new Error(`User with email ${username} was not found.`);
        return user;
    }
    static checkUser(username: string, password: string): boolean {
        const user = users.find(u => u.username === username);
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