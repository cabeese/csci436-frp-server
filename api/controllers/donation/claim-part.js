module.exports = {
  friendlyName: 'Claim part of a donation',
  description: 'Selectively claim portions of one or more items in an existing donation',

  inputs: {
    donationID: {
      type: "number",
      required: true,
      description: "The ID of the donation against which this claim is made"
    },
    foodName: {
      type: "string",
      required: true,
      description: "The type of food to claim. Must exactly match the 'foodName' property of the donation"
    },
    qty: {
      type: "number",
      required: true,
      description: "How much of the item to claim. Units will match those on the line-item record"
    },
  },

  exits: {
    noSuchItem: {
      statusCode: 404,
      description: "That item or donation didn't exist",
    },
    notEnoughLeft: {
      statusCode: 400,
      description: "Requested too much of the given item",
    },
    invalidQty: {
      statusCode: 400,
      description: "Quantity must be > 0",
    }
  },

 fn: async function (inputs) {
    let {donationID, foodName, qty} = inputs;

    /* Find the donation item */
    item = await Donation_Item.findOne({
      parent: donationID,
      foodName: foodName
    });

    /* If the item doesn't exist, throw an error */
    if(!item){
      throw 'noSuchItem';
    }

    if(qty <= 0){
      throw 'invalidQty'
    }

    if(item.remainingQty - qty < 0){
      /* Throw an error - not enough of that item left! */
      throw 'notEnoughLeft'
    }

    /* If there's enough quantity left to claim, claim it */
    item.remainingQty -= qty;
    await Donation_Item.updateOne({id: item.id}).set({remainingQty: item.remainingQty});
    // TODO: round to the nearest... what, 0.25, maybe? To avoid floating point issues later

    /* Update the original item to "claimed" if need be */
    await sails.helpers.updateIsClaimed(donationID);
  }
};
