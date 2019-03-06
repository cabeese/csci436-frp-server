/**
 * Donation_item.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const isPositive = val => typeof(val) === "number" && val >= 0;

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    foodName: {
      type: "string",
      required: true,
      description: "The type of food in this line item (e.g. 'blueberries' or 'fruits')"
    },

    initialQty: {
      type: "number",
      required: true,
      custom: isPositive,
      description: "The amount of this item available initially"
    },

    remainingQty: {
      type: "number",
      required: true,
      custom: isPositive,
      description: "The amount of this item still available (based on how much has been claimed)"
    },

    qtyUnits: {
      type: "string",
      isIn: ["crates", "pallets", "pounds"],
      required: true,
      description: "The units to use when referring to the quantity of the item"
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    parent: {
      required: true,
      model: "donation"
    }

  },

};

