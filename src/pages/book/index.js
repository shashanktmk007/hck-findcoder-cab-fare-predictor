import {
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import "./book.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoBox,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import getCurrentLocation from "../../utils/location";
import { calculatePrice } from "../../utils/price";
import getVehicleData from "../../services/vehicleInfo";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { SourceDestinationPikcer } from "../../components/SourceDestinationPicker";

export default function Book() {
  // let center = getCurrentLocation()
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // googleMapsApiKey: "process.env.REACT_APP_GOOGLE_MAPS_API_KEY",
    libraries: ["places"],
  });
  let center = { lat: 48.8584, lng: 2.2945 };

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [sourceLocation, setSourceLocation] = useState({
    lat: 48.8584,
    lng: 2.2945,
    locString: "none",
  });
  const [destinationPlace, setDestinationPlace] = useState("");
  const [distance, setDistance] = useState({});
  const [duration, setDuration] = useState({});
  const [detectingLocation, setDetectingLocation] = useState();

  /** @type React.MutableRefObject<HTMLElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    console.log(originRef.current.value);
    console.log(destiantionRef.current.value);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    setDestinationPlace(destiantionRef.current.value);
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance({
      text: results.routes[0].legs[0].distance.text,
      value: results.routes[0].legs[0].distance.value,
    });
    setDuration({
      text: results.routes[0].legs[0].duration.text,
      value: results.routes[0].legs[0].duration.value,
    });
  };

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  function renderVechileData() {
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
    } else {
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
        // price: calculatePrice(
        //   Math.round(22940 / 1000),
        //   9600 / 60,
        //   hasPriceSurge,
        //   priceSurge,
        //   value.pricePerKm
        // ),
        image: value.image,
        name: value.name,
        description: value.description,
        hasPriceSurge: hasPriceSurge,
      });
    });
    console.log(arr);
    arr.forEach((e) => console.log(e));
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

  let reachBy = new Date();
  console.log(reachBy.getMinutes());
  console.log(reachBy);

  reachBy.setMinutes(reachBy.getMinutes() + duration.value / 60);
  console.log(reachBy);
  console.log(reachBy);
  let reachByMins =
    reachBy.getMinutes() <= 9
      ? "0" + reachBy.getMinutes()
      : reachBy.getMinutes();
  return (
    <>
      {!distance.value && (
        <SourceDestinationPikcer
          originRef={originRef}
          sourceLocation={sourceLocation}
          setDetectingLocation={setDetectingLocation}
          setDirectionsResponse={setDirectionsResponse}
          setSourceLocation={setSourceLocation}
          detectingLocation={detectingLocation}
          destiantionRef={destiantionRef}
          calculateRoute={calculateRoute}
        />
      )}

      {distance.value && (
        <>
          <div
            style={{
              background: "grey",
              width: "100vw",
              height: "25vh",
            }}
          >
            <GoogleMap
              center={{ lat: sourceLocation.lat, lng: sourceLocation.lng }}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
            <Typography
              style={{
                position: "absoulute",
                zIndex: "1",
                background: "transparent",
                display: "inline",
              }}
              variant="body2"
            >
              {" Distance : " + distance.text}
            </Typography>
            <Typography
              style={{
                position: "absoulute",
                zIndex: "1",
                background: "transparent",
                display: "inline",
              }}
              variant="body2"
            >
              {"                  Reach By : " +
                reachBy.getHours() +
                " : " +
                reachByMins}
            </Typography>
            {renderVechileData()}
          </div>
        </>
      )}
    </>
  );
}
