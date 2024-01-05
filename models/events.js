'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate({ Stage, Stage_Event, Meet_Greet, Set_Time }) {
      //stages
      Events.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: Stage_Event
      })

      //meet and greets
      Events.hasMany(Meet_Greet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })

      //set times
      Events.hasMany(Set_Time, {
        foreignKey: "event_id",
        as: "set_times"
      })
    }
  }
  Events.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timeStamps: false
  });
  return Events;
};