module.exports = {
  friendlyName: 'Get available donations',
  description: 'Get all donations that haven\'t yet been claimed',

  inputs: {
    limit: {
      type: "number",
      description: "Limit the number of results returned",
    },
    includeItems: {
      type: "boolean",
      description: "If true, include the items in each donation",
    }
  },

  exits: {},

  fn: async function (inputs) {
    let {limit, includeItems} = inputs;

    let query = Donation.find({claimed: false});
    if(limit > -1){ query.limit(limit); }
    if(includeItems){ query.populate(includeItems ? "items" : ""); }

    let donations = await query;

    return donations;
  }
};
