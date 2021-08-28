'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Course', [
      {
        id: 1,
        code: "ChE-526",
        name: "Biochemical Engineering",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        code: "ChE-527",
        name: "Chemical Engineering Project 2",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        code: "ChE-528",
        name: "Plant Design",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        code: "ChE-529",
        name: "Process Dynamics and Control",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        code: "ChE-530",
        name: "Industrial Waste Management and Control",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        code: "ChE-531",
        name: "Chemical Engineering Practice with Comprehensive Examination",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        code: "IE-530",
        name: "Engineering Management",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        code: "IE-531",
        name: "Quantitative Methods in Management",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        code: "IE-532",
        name: "Technopreneurship",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        code: "EE-427",
        name: "Basic Electrical and Electronics Engineering",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        code: "ChEE-401",
        name: "ChE Elective 1",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        code: "ChEE-402",
        name: "ChE Elective 2",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        code: "Math 121",
        name: "Probability and Statistics",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        code: "Math-115",
        name: "Integral Calculus",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        code: "Math-114",
        name: "Differential Calculus",
        units: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Course', null, {});
  }
};
