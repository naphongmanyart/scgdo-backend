var Doscg = require('../model/doscg.model');

exports.sequence = () => {
  const sequenceArr = Doscg.sequenceArr();
  let newArr = [];

  for (let i = 0; i < sequenceArr.length; i++) {
    if (typeof sequenceArr[i] !== 'number') {
      let nth = i + 1;
      let calculation = Math.pow(nth, 2) - 3 * nth + 5;
      newArr.push(calculation);
    } else {
      newArr.push(sequenceArr[i]);
    }
  }

  let data = { problem: sequenceArr, answer: newArr };
  return data;
};

exports.equation = () => {
  const a = Doscg.a();
  let b = 23 - a;
  let c = -21 - a;

  let value = { a: a, b: b, c: c };
  return value;
};

exports.getRoutes = async () => {
  const data = await Doscg.routeData();

  let drivingData = data[0][0];
  let walkingData = data[1][0];
  let bicyclingData = data[2][0];
  let transitData = data[3][0];

  let drivingScore = ''
  let walkingScore = ''
  let bicyclingScore = ''
  let transitScore = ''

  if (drivingData == undefined) {
    drivingScore = 9999999;
  } else {
    drivingScore = data[0][0].legs[0].duration_in_traffic.value;
  }

  if (walkingData == undefined) {
    walkingScore = 9999999;
  } else {
    walkingScore = data[1][0].legs[0].duration.value;
  }

  if (bicyclingData == undefined) {
    bicyclingScore = 9999999;
  } else {
    bicyclingScore = data[2][0].legs[0].duration.value;
  }

  if (transitData == undefined) {
    transitScore = 9999999;
  } else {
    transitScore = data[3][0].legs[0].duration.value;
  }

  let compare = Math.min(drivingScore, walkingScore, bicyclingScore, transitScore)
  let bestRoute = []

  switch (compare) {
    case drivingScore:
      bestRoute = drivingData
      break;
    case walkingScore:
      bestRoute = walkingData
      break;
    case bicyclingScore:
      bestRoute = bicyclingData
      break;
    case transitScore:
      bestRoute = transitData
      break;
    default:
      return;
  }
  
  return bestRoute
};
