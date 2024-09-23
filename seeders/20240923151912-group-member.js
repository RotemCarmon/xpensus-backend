'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'group_member',
      [
        {
          id: 1,
          groupId: 1,
          userId: 1,
          invitationId: null,
          status: 'admin',
          joinedAt: new Date(),
          leftAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          groupId: 2,
          userId: 1,
          invitationId: null,
          status: 'admin',
          joinedAt: new Date(),
          leftAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          groupId: 1,
          userId: 2,
          invitationId: null,
          status: 'joined',
          joinedAt: new Date(),
          leftAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('group_member', null, {});
  },
};
