module.exports = {
  friendlyName: 'Post new',
  description: 'Create a new donation in the database.',

  inputs: {
    location: {
      type: "string",
      required: true,
      description: "Where the donation is. (Address? GPS Coords?)",
    },
    contactPhone: {
      type: "string",
      required: true,
      description: "A phone number someone can call with questions about the donation.",
    },
    items: {
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

  fn: async function (inputs) {
    let {location, contactPhone, items} = inputs;
    let donation = {
      /* TODO: get user's ID and put it here */
      location,
      contactPhone,
      claimed: false,
    };

    // Complain if the 'items' parameter is not an array or is empty
    if(!Array.isArray(items)){
      throw { "invalidItems": "The 'items' field must be an array" }
    }
    if(items.length === 0){
      throw { "noItems": "The 'items' field was empty - please include items to donate!" }
    }

    // First, save the parent Donation object
    let {id} = await Donation.create(donation).fetch();

    // Now give each donation_item the appropriate parent id
    items.forEach(function(item){
      item.parent = id;
    });

    // Save all the donation items
    try {
      await Donation_Item.createEach(items).fetch();
    } catch(e){
      // Shoot - one of the items was invalid. Destroy this record and complain to user
      let {details} = e;
      await Donation.destroy({id: id}).fetch();
      throw { "invalidItems": details }
    }

    // Update the 'claimed' status of the new donation
    await sails.helpers.updateIsClaimed(id);
  }
};
