const { db, Sequelize } = require('./db.js');

const User = db.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: Sequelize.STRING, required: true, unique: true},
    password: {type: Sequelize.STRING, required: true},
    name:{type: Sequelize.STRING, required: true},
    phone:{type: Sequelize.STRING, required: true},
    location:{type: Sequelize.STRING, required: true},
    img:{type: Sequelize.STRING, required: false},
    cvFile:{type: Sequelize.STRING, required: false},
    summary:{type: Sequelize.STRING, required: false},
    is_teacher:{type: Sequelize.BOOLEAN, required: true}
});

const Subject = db.define('subject', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
   name:{type: Sequelize.STRING, required: true},
   level:{type: Sequelize.STRING, required: true}
});

const Role = db.define('role', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
   role:{type: Sequelize.STRING, required: true}
});

const Rating = db.define('rating', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    text:{type: Sequelize.STRING, required: true},
    rate:{type: Sequelize.INTEGER, required: true},
    date:{type: Sequelize.DATE, required: true}
});

const Permission = db.define('permission', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
   name:{type: Sequelize.STRING, required: true}
});


Role.belongsToMany(User, {through: 'UserRole'});
User.belongsToMany(Role, {through: 'UserRole'});

Subject.belongsToMany(User, {through: 'TeacherSubject'});
User.belongsToMany(Subject, {through: 'TeacherSubject'});

User.hasMany(Rating);


module.exports.User = User;