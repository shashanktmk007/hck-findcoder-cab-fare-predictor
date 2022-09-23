# hck-findcoder-cab-fare-predictor

I created this project for findcoder.io hackathon.

## Local setup

### Prerequsite

Make sure you have your API key(You can get it from Google Cloud Platform Console) to go ahead with below steps

create a file .env at root and add you key. Example

```
REACT_APP_GOOGLE_MAPS_API_KEY=[YOUR_KEY_HERE]
```

```
yarn install
export HTTPS=true && yarn start

-- if using node --

node install
node start
```

## Tech Stack

- React
- Material UI / Chakra - UI
- Some JS (API calls or basics)

# Technical Details

## 1. Price Calculation

Path : src/utils/price.js

```
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
  // send this to some magic AI to predict right price as per the customer behaviour
  return "₹ " + Math.round(price, 2);
}
```

The plan is to use each variable which constitues to price as a co-efficient and display final price to the user

```
function getDurationWeightage(duration) {
  if (duration <= 60) return 1;
  else if (duration <= 90) return 1.1;
  else if (duration <= 120) return 1.3;
  else if (duration <= 180) return 1.8;
  return 2;
}
```

```
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
```

# Future Improvements

- Right now, price is being calculated on front end, if replaced with a Price Orchestration Layer would be better.
  If POL has a chance to run some Machine Learning to predict the right price at given time could be more benificial.

- Make it also work for mWeb
- Add login functionality for personalisation
- Business has some privileges
