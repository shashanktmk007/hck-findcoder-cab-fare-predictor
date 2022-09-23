/* eslint-disable no-undef */
export default function getCurrentLocation(key) {
  return new Promise((resolve, reject) => {
    let location;
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            let geocoder = new google.maps.Geocoder();

            geocoder
              .geocode({ location: { lat: location.lat, lng: location.lng } })
              .then((response) => {
                if (response.results[0]) {
                  console.log("latlng ", response.results[0].formatted_address);
                  location.newDecodedAddress =
                    response.results[0].formatted_address;
                  console.log("resolve(location) - 2", location);

                  resolve(location);
                } else {
                  window.alert("No results found");
                }
              })
              .catch((e) => window.alert("Geocoder failed due to: " + e));

            console.log("resolve(location)", location);
          },
          (error) => {
            //Handle Errors
            // eslint-disable-next-line default-case
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            }
            alert("GEO location error");
            reject({ lat: 48.8584, lng: 2.2945 });
          }
        );
      } else {
        alert("YOur browser does not support geo loc");
        reject({ lat: 48.8584, lng: 2.2945 });
      }
    } catch (error) {
      alert(JSON.stringify(error));
      reject({ lat: 48.8584, lng: 2.2945 });
    }
  });
}
