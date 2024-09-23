'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: 'example@gmail.com',
          password: '$2a$10$ou4Eq1KX/ucLojGeoYzs3eEBGw4/4Xacn5fQeGqIFAzAuY7Ympep2', // password,
          username: 'example johns',
          status: 'active',
          lastLoginAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'test@gmail.com',
          password: '$2a$10$ou4Eq1KX/ucLojGeoYzs3eEBGw4/4Xacn5fQeGqIFAzAuY7Ympep2', // password,
          username: 'test testy',
          status: 'active',
          lastLoginAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
