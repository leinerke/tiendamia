'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderData = []
    const currentDate = new Date()

    for (let i = 0; i < 20; i++) {
      const daysToAdd = Math.floor(Math.random() * 5) + 1
      const shippingPromise = new Date(currentDate)
      shippingPromise.setDate(currentDate.getDate() + daysToAdd)

      orderData.push({
        status: getRandomOrderStatus(),
        client: `Client ${i + 1}`,
        shipping_address: `Address ${i + 1}`,
        shipping_promise: shippingPromise,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    await queryInterface.bulkInsert('orders', orderData)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {})
  },
}

function getRandomOrderStatus() {
  const statuses = ['Approve', 'Cancel', 'Delivery', 'Traveling']
  return statuses[Math.floor(Math.random() * statuses.length)]
}
