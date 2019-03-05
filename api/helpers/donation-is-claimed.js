module.exports = {


  friendlyName: 'Donation is claimed',


  description: '',


  inputs: {
    items: { type: ['ref'] }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function (inputs) {
    let {items} = inputs;
    let ct = 0;
    items.forEach(item => {
      ct += item.remainingQty;
    });
    return ct === 0;
  }


};

