'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [
      {
        title: 'Item 1',
        description: 'Description for Item 1',
        url: 'https://example.com/item1',
        price: 9.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 2',
        description: 'Description for Item 2',
        url: 'https://example.com/item2',
        price: 19.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 3',
        description: 'Description for Item 3',
        url: 'https://example.com/item3',
        price: 14.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 4',
        description: 'Description for Item 4',
        url: 'https://example.com/item4',
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 5',
        description: 'Description for Item 5',
        url: 'https://example.com/item5',
        price: 12.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 6',
        description: 'Description for Item 6',
        url: 'https://example.com/item6',
        price: 24.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 7',
        description: 'Description for Item 7',
        url: 'https://example.com/item7',
        price: 8.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 8',
        description: 'Description for Item 8',
        url: 'https://example.com/item8',
        price: 17.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 9',
        description: 'Description for Item 9',
        url: 'https://example.com/item9',
        price: 10.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Item 10',
        description: 'Description for Item 10',
        url: 'https://example.com/item10',
        price: 21.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {})
  },
}
