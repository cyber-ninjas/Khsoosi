    
const Sequelize = require("sequelize");

//Database connection
const db = new Sequelize('sql2292264', 'sql2292264', 'wS4*zG6%', {
    host: 'sql2.freesqldatabase.com',
    dialect: 'mysql',
})

db.sync({ force: false, logging: false  }).then(() => {
    console.log(`Database & tables created!`)
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;