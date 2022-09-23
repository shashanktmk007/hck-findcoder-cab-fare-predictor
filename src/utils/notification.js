export function sendNotification(message, destination, startlocation) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      if (message) {
        new Notification("Hey There !! ", { body: message });
      } else if (startlocation) {
        if (Math.random() > 0.5) {
          new Notification("Caption on the way", {
            body: `Rahul (AP10E469) will reach ${startlocation} in 2 mins. Your OTP for trip is 3232`,
          });
        } else {
          new Notification("Caption on the way", {
            body: `Raju (AP10D249) will reach ${startlocation} in 2 mins. Your OTP for trip is 37434`,
          });
        }
      } else if (destination) {
        if (Math.random() > 0.5) {
          new Notification("Ride has been scheduled", {
            body: `Your ride to ${destination} has been scheduled. Your OTP for trip is 3232. Happie & safe Journey`,
          });
        } else {
          new Notification("Ride has been scheduled", {
            body: `Your ride to ${destination} has been scheduled. Your OTP for trip is 3232`,
          });
        }
      }
    } else {
      alert(
        "Appears that notifications are turnoff, please fill the below form and i can book a ride"
      );
    }
  });
}
