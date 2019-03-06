module.exports = {


  friendlyName: 'Post new',


  description: '',


  inputs: {
    donation: {
      type: "json",
      required: true,
      description: "A new donation object. Will be validated, right?"
    }
  },


  exits: {
    noItems: {
      statusCode: 400,
    },
    invalidItems: {
      statusCode: 400,
    }
  },


  fn: async function (inputs, exits) {
    let {donation} = inputs;
    let {items} = donation;
    donation.items = [];

    // Complain if the 'items' array is empty
    if(items.length === 0){
      return exits.noItems({
        error: true,
        message: "The 'items' field was empty - please include items to donate!",
      });
    }

    // First, save the parent Donation object
    let {id} = await Donation.create(donation).fetch();

    // Now give each donation_item the appropriate parent id
    items.forEach(function(item){
      item.parent = id;
    });

    // Save all the donation items
    let savedItems;
    try {
      savedItems = await Donation_Item.createEach(items).fetch();
    } catch(e){
      // Shoot - one of the items was invalid. Destroy this record and complain to user
      let {details} = e;
      await Donation.destroy({id: id}).fetch();
      return exits.invalidItems({
        error: true,
        message: details,
      });
    }

    // Update the 'claimed' status of the new donation
    let claimed = sails.helpers.donationIsClaimed(savedItems);
    await Donation.updateOne({id: id}).set({claimed: claimed});

    // All done.
    return;

  }


};