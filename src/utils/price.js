export function calculatePrice(
  distance,
  duration,
  hasPriceSurge,
  priceSurge,
  pricePerKM
) {
  let durationCoefficient = getDurationWeightage(duration);
  let timeOfDayCoefficient = getTimeWeightage();
  let basePrice =
    distance * pricePerKM * durationCoefficient * timeOfDayCoefficient;
  let price = hasPriceSurge ? basePrice * priceSurge : basePrice;
  console.log(
    distance,
    duration,
    hasPriceSurge,
    priceSurge,
    pricePerKM,
    durationCoefficient,
    timeOfDayCoefficient
  );

  // send this to some magic AI to predict right price as per the customer behaviour
  return "₹ " + Math.round(price, 2);
}

function getDurationWeightage(duration) {
  if (duration <= 60) return 1;
  else if (duration <= 90) return 1.1;
  else if (duration <= 120) return 1.3;
  else if (duration <= 180) return 1.8;
  return 2;
}

function getTimeWeightage() {
  //ideally this should be from the server, as there are changes to change time in mobile
  let hours = new Date().getHours();
  if (hours <= 5) return 1;
  else if (hours <= 9) return 1.1;
  else if (hours <= 16) return 1.3;
  else if (hours <= 19) return 1.5;
  else if (hours <= 22) return 1.8;
  return 2;
}
