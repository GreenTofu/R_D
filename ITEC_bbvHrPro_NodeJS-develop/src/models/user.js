import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { omit, pick } from 'lodash';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manager: {
        type: DataTypes.STRING,
      },
      startingDate: {
        type: DataTypes.DATEONLY,
      },
      avatar: {
        type: DataTypes.STRING(512),
      },
      password: {
        type: DataTypes.STRING,
      },
      availability: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.calculateAvailability();
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            await user.setPassword(user.password);
          }
        },
      },
    },
  );

  User.associate = function associate(models) {
    User.belongsToMany(models.Project, {
      through: models.ProjectMember,
      as: 'projects',
      foreignKey: { name: 'employeeId' },
    });

    User.hasMany(models.Project, {
      as: 'manageProjects',
      foreignKey: { name: 'manager' },
    });

    User.belongsToMany(models.Tag, {
      through: 'User_Skill',
      as: 'tags',
      foreignKey: 'userID',
    });

    User.hasMany(models.User, {
      as: 'employees',
      foreignKey: { name: 'manager' },
    });

    User.belongsTo(models.User, {
      as: 'directManager',
      foreignKey: { name: 'manager' },
    });
    User.hasMany(models.Goal, {
      as: 'goals',
      foreignKey: { name: 'userId' },
    });
    User.hasMany(models.GoalDiscussion, {
      as: 'goalDiscussion',
      foreignKey: { name: 'userId' },
    });
    User.hasMany(models.PerformanceReview, {
      as: 'selfReviews',
      foreignKey: { name: 'employeeId' },
    });
    User.hasMany(models.PerformanceReview, {
      as: 'evaluateReviews',
      foreignKey: { name: 'evaluatorId' },
    });
    User.hasMany(models.PerformanceReviewGoal, {
      as: 'PerformanceReviewGoal',
      foreignKey: { name: 'userId' },
    });
    User.hasMany(models.PerformanceReviewCriteria, {
      as: 'PerformanceReviewCriteria',
      foreignKey: { name: 'userId' },
    });
    User.hasMany(models.PerformanceReviewCycle, {
      as: 'PerformanceReviewCycle',
      foreignKey: { name: 'creatorId' },
    });
    User.hasMany(models.PerformanceReviewFeedback, {
      as: 'PerformanceReviewFeedback',
      foreignKey: { name: 'userId' },
    });
  };

  User.prototype.setPassword = async function setPassword(
    userPassword,
  ) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(userPassword, saltRounds);
  };

  User.prototype.toJSON = function toJSON() {
    return omit(this.get(), 'password');
  };

  User.prototype.calculateAvailability = function calculate() {
    let currentEffort = 0;

    this?.projects?.forEach((project) => {
      if (project.projectStatus.statusName === 'In progress') {
        currentEffort += project.working.effort;
      }
    });

    const currentAvailable = 100 - currentEffort;

    return currentAvailable;
  };

  User.prototype.generateToken = function generateToken() {
    const payload = pick(this.get(), ['id', 'email']);
    const token = jwt.sign(payload, process.env.JWT_KEY);

    return token;
  };

  return User;
};
