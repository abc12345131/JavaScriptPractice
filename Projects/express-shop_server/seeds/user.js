const models = require('../models')

exports.createUsersWithMessages = async (date) => {
    await models.UserModel.create(
        {
            username: 'admin',
            email: 'abc12345131@gmail.com',
            password: 'admin',
            role: 'ADMIN',
            messages: [
                {
                    text: 'Published the Road to learn React',
                    createdAt: date.setSeconds(date.getSeconds() + 1),
                },
            ],
        },
        {
            include: [models.MessageModel],
        },
    )
    .catch(error=>{
        console.error(`Unable to create user with messages in database:`, error)
    })
  
    await models.UserModel.create(
        {
            username: 'testuser1',
            email: 'testuser1@gmail.com',
            password: 'testuser1',
            messages: [
                {
                    text: 'Happy to release ...',
                    createdAt: date.setSeconds(date.getSeconds() + 1),
                },
                {
                    text: 'Published a complete ...',
                    createdAt: date.setSeconds(date.getSeconds() + 1),
                },
            ],
        },
        {
            include: [models.MessageModel],
        },
    )
    .catch(error=>{
        console.error(`Unable to create user with messages in database:`, error)
    })
}