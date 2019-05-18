const { db, Sequelize } = require("./db.js");

const User = db.define("user", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  name: { type: Sequelize.STRING, required: true },
  phone: { type: Sequelize.STRING, required: true },
  location: { type: Sequelize.STRING, required: true },
  img: { type: Sequelize.STRING, required: false },
  cvFile: { type: Sequelize.STRING, required: false },
  summary: { type: Sequelize.STRING, required: false },
  is_teacher: { type: Sequelize.BOOLEAN, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const Subject = db.define("subject", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, required: true },
  level: { type: Sequelize.STRING, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const Role = db.define("role", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  role: { type: Sequelize.STRING, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const Rating = db.define("rating", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: Sequelize.STRING, required: true },
  rate: { type: Sequelize.INTEGER, required: true },
  date: { type: Sequelize.DATE, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const Permission = db.define("permission", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const Schedule = db.define("schedule", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  day: { type: Sequelize.STRING, required: true },
  startHour: { type: Sequelize.STRING, required: true },
  endHour: { type: Sequelize.STRING, required: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const PermissionRole = db.define("PermissionRole", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const UserRole = db.define("UserRole", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

const TeacherSubject = db.define("TeacherSubject", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
});

Role.belongsToMany(Permission, { through: "PermissionRole" });
Permission.belongsToMany(Role, { through: "PermissionRole" });

Role.belongsToMany(User, { through: "UserRole" });
User.belongsToMany(Role, { through: "UserRole" });

Subject.belongsToMany(User, { through: "TeacherSubject" });
User.belongsToMany(Subject, { through: "TeacherSubject" });

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Schedule);
Schedule.belongsTo(User);

module.exports.User = User;
module.exports.Schedule = Schedule;
module.exports.Role = Role;
module.exports.Permission = Permission;
module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.PermissionRole = PermissionRole;
module.exports.UserRole = UserRole;
module.exports.TeacherSubject = TeacherSubject;
