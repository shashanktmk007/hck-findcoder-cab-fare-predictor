import { LinearProgress } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import getCurrentLocation from "../../utils/location";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

export function SourceDestinationPikcer({
  originRef,
  sourceLocation,
  setDetectingLocation,
  setDirectionsResponse,
  setSourceLocation,
  detectingLocation,
  destiantionRef,
  calculateRoute,
}) {
  return (
    <div
      style={{
        zIndex: "1",
        position: "absolute",
        background: "#f4f0f0e0",
        width: "100vw",
        paddingLeft: "20px",
        paddingTop: "20px",
      }}
    >
      <Autocomplete>
        <>
          {" "}
          <input
            className="input-location sfWidth"
            label="Source Location"
            id="sourceLocation"
            ref={originRef}
            placeholder="Source Location"
            value={
              sourceLocation.locString === "none"
                ? ""
                : sourceLocation.locString
            }
            // style={{ margin: "30px 0" }}
          />
          <span className="searchIcon">
            <MyLocationOutlinedIcon
              sx={{ fontSize: "24px" }}
              color="cyan"
              onClick={() => {
                setDetectingLocation(true);
                getCurrentLocation(
                  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                ).then((locc) => {
                  setDirectionsResponse(locc);
                  console.log("locc", locc);
                  setSourceLocation({
                    lat: locc.lat,
                    lng: locc.lng,
                    locString: locc.newDecodedAddress,
                  });
                  setDetectingLocation(false);
                });
              }}
            />
          </span>
        </>
      </Autocomplete>
      {detectingLocation && (
        <LinearProgress style={{ margin: "30px 0", width: "85vw" }} />
      )}
      <div style={{ margin: "30px 0" }}>
        <Autocomplete>
          <>
            <input
              className="input-location sfWidth"
              label="Destination Location"
              id="destinationLocation"
              ref={destiantionRef}
              placeholder="Destination Location"
              // value="Dilsukhnagar, Hyderabad, Telangana, India"
              // style={{ margin: "30px 0" }}
            />
            <NearMeOutlinedIcon
              onClick={calculateRoute}
              sx={{ fontSize: "24px" }}
              className="searchIcon"
            />
          </>
        </Autocomplete>
      </div>
      {/* {renderVechileData()} */}
    </div>
  );
}
