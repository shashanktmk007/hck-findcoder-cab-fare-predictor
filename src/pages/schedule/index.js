import { Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { sendNotification } from "../../utils/notification";

export function Schedule() {
  useEffect(() => {
    document.getElementById("notifyMe").addEventListener("click", () => {
      let location = document.getElementById("location").value;
      sendNotification("", location, "");
    });
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "20px",
        width: "90vw",
        marginLeft: "20px",
      }}
    >
      <TextField fullWidth label="Enter destination" id="location" />
      <Typography>
        As its a demo project sending notification right away
      </Typography>
      <Button id="notifyMe">Send notification</Button>
    </div>
  );
}
