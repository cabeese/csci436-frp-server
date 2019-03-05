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

  },


  fn: async function (inputs) {

    let {donation} = inputs;
    let {items} = donation;
    donation.items = [];

    let {id} = await Donation.create(donation).fetch();

    items.forEach(function(item){
      item.parent = id;
    });

    let savedItems = await Donation_Item.createEach(items).fetch();

    // TODO:
    // * set 'isClaimed' property on parent donation
    // * handle errors if some of these are bad (delete all saved)

    // All done.
    return;

  }


};
