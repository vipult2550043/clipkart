import bcrypt from'bcryptjs'
const users = [{
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true
},
{
    name: 'Vipul',
    email: 'test@test.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
    }];

export default users;