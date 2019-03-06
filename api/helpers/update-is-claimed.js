module.exports = {


  friendlyName: 'Update is claimed',


  description: 'Update the "claimed" property on a donation based on its items',


  inputs: {
    donationID: {
      type: "number",
      required: true,
      description: "The ID of the donation to update"
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let {donationID} = inputs;

    donation = await Donation.findOne({id: donationID}).populate("items");

    let {items} = donation;
    let ct = 0;
    items.forEach(item => {
      ct += item.remainingQty;
    });
    let claimed = ct === 0;

    await Donation.updateOne({id: donationID}).set({claimed});
  }


};

