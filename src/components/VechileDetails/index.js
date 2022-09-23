import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { calculatePrice } from "../../utils/price";
import getVehicleData from "../../services/vehicleInfo";
import { Grid, Typography } from "@mui/material";
export default function VechileDetails(
  destiantionRef,
  destinationPlace,
  duration,
  distance
) {
  let hasPriceSurge = false;
  let priceSurge = 0;
  if (
    (destiantionRef &&
      destiantionRef.current &&
      destiantionRef.current.value &&
      destiantionRef.current.value.indexOf("HITEC") !== -1) ||
    (destinationPlace && destinationPlace.indexOf("HITEC") !== -1)
  ) {
    hasPriceSurge = true;
    priceSurge = 1.25;
    console.log("destiantionRef.current.value", hasPriceSurge);
  }
  if (!duration) {
    return;
  }
  let arr = [];
  Object.entries(getVehicleData()).forEach(([key, value]) => {
    console.log(distance, duration, hasPriceSurge, priceSurge, value);
    let formattedDistance = Math.round(distance.value / 1000);
    formattedDistance = !formattedDistance ? 2 : formattedDistance;
    //TODO: handle distance too small if time permits
    arr.push({
      key: key,
      price: calculatePrice(
        formattedDistance,
        duration.value / 60,
        hasPriceSurge,
        priceSurge,
        value.pricePerKm
      ),
      image: value.image,
      name: value.name,
      description: value.description,
      hasPriceSurge: hasPriceSurge,
    });
  });
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "2px" }}>
        {arr.map((entry) => {
          let originalPrice = +entry.price.split("₹ ")[1];
          // alert(entry.price.split("₹ "));
          let discountPrice = originalPrice - 0.15 * originalPrice;
          return (
            <>
              <Grid
                item
                xs={3}
                className="gridItem"
                style={{ paddingTop: "-4px" }}
              >
                <img src={entry.image} width="100%" alt="car" />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6">{entry.name}</Typography>
                <Typography>{entry.description}</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Typography style={{ alignContent: "right" }} variant="h6">
                  {entry.price}
                </Typography>
                {entry.hasPriceSurge && (
                  <>
                    {priceSurge}x
                    <ElectricBoltIcon
                      style={{ color: "red" }}
                      label="Surge"
                    ></ElectricBoltIcon>
                  </>
                )}
              </Grid>
              <div style={{ borderBottom: "2px solid cyan" }}></div>
            </>
          );
        })}
      </Grid>
    </>
  );
}
