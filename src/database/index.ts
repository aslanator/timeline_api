import {createConnection} from "typeorm";
import {User} from '../models/User';

export default createConnection().then(async connection => {
    const user1 = new User();
    user1.name = "Vasiliy";
    user1.login = 'blabla';
    user1.password = '123';
    await connection.manager.save(user1);
});