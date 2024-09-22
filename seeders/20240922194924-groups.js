'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'groups',
      [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test Group Description',
          status: 'active',
          createdBy: 1,
          createdAt: new Date(new Date().getTime() - 10 * 60000),
          updatedAt: new Date(new Date().getTime() - 10 * 60000),
        },
        {
          id: 2,
          name: 'Test Group 2',
          description: 'Test Group 2 Description!',
          status: 'active',
          createdBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('group', null, {});
  },
};
