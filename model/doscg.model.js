module.exports = {
  sequenceArr: () => {
    return ['x', 'y', 5, 9, 15, 23, 'z'];
  },

  a: () => {
    return 21;
  },

  routeData: async () => {
    const { Client, Status } = require('@googlemaps/google-maps-services-js');

    const client = new Client({});
    const start =
      'SCG สำนักงานใหญ่ บางซื่อ 1 Siam Cement Alley, Bang Sue, Bangkok 10800';
    const end =
      'centralwOrld, 999/9 Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330';

    let data = [];
    let modeItem = ['driving', 'walking', 'bicycling', 'transit'];

    for (let i = 0; i < modeItem.length; i++) {
      await client
        .directions({
          params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            origin: start,
            destination: end,
            mode: modeItem[i],
            alternatives: true,
            language: 'th',
            departure_time: 'now',
          },
          // timeout: 1000, // milliseconds
          // }, axiosInstance)
        })
        .then((r) => {
          data.push(r.data.routes);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return data
  },
};
