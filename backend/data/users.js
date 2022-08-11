import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Pavle Pavlov',
        email: 'pavle@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Petar Petrov',
        email: 'petar@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users