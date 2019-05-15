    
const Sequelize = require("sequelize");

//Database connection
const db = new Sequelize('khsoosi', 'root', 'ninja', {
    host: 'localhost',
    dialect: 'mysql',
})

db.sync({ force: false, logging: false  }).then(() => {
    console.log(`Database & tables created!`)
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;