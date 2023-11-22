'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
          {
              email: "izzuddinalfatah33@gmail.com",
              password: "AlFatah_347",
              isAdmin: true,
              createdAt: new Date(),
              updatedAt: new Date(),
          },
      ],
      {}
  );
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Human', null, {});
     
  }
};