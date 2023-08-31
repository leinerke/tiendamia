'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener IDs de las órdenes y los items (suponiendo que sus IDs son 1 a 20 para órdenes y 1 a 10 para items)
    const orderIds = Array.from({ length: 20 }, (_, index) => index + 1)
    const itemIds = Array.from({ length: 10 }, (_, index) => index + 1)

    // Crear registros de order_items
    const orderItems = []
    for (const orderId of orderIds) {
      // Determinar un número aleatorio de items entre 1 y 5 para cada orden
      const itemCount = Math.floor(Math.random() * 5) + 1

      // Seleccionar items aleatoriamente para la orden
      const selectedItems = []
      while (selectedItems.length < itemCount) {
        const randomItemId = itemIds[Math.floor(Math.random() * itemIds.length)]
        if (!selectedItems.includes(randomItemId)) {
          selectedItems.push(randomItemId)
        }
      }

      for (const itemId of selectedItems) {
        orderItems.push({
          order_id: orderId,
          item_id: itemId,
          quantity: Math.floor(Math.random() * 5) + 1, // Cantidad aleatoria entre 1 y 5
          created_at: new Date(),
          updated_at: new Date(),
        })
      }
    }

    await queryInterface.bulkInsert('order_items', orderItems)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_items', null, {})
  },
}
