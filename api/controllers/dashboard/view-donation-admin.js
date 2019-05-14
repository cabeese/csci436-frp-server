module.exports = {


  friendlyName: 'View donation admin',


  description: 'Display "Donation admin" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/donation-admin'
    }

  },

 fn: async function () {
    donations = await Donation.find({}).populate("items");
    users = await User.find({});

    // Respond with view.
    return {
      donations,
      users,
    };

  }


};
