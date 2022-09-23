import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Item,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import "./home.css";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
// import { Link } from "react-router-dom";

let homeTiles = [
  {
    variant: "outlined",
    primaryText: "Show my Offers",
    imageLink: "",
    ctaLink: "snbsb",
    ctaText: "Use GPay and get additional 25% discount on all rides.",
    xs: "12",
  },
  {
    variant: "outlined",
    primaryText: "Ride",
    imageLink:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1635756461/assets/36/e053ef-e935-4549-a10e-9d97ef38116f/original/uber-van.png",
    ctaLink: "/book",
    ctaText: "",
    xs: "6",
  },
  {
    variant: "outlined",
    primaryText: "Schedule",
    imageLink:
      "https://static.vecteezy.com/system/resources/previews/006/993/455/non_2x/3d-realistic-blue-clock-illustration-vector.jpg",
    ctaLink: "",
    ctaText: "",
    xs: "6",
    width: "65%",
  },
  {
    variant: "outlined",
    primaryText: "Book for Others",
    imageLink:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1029,h_579/f_auto,q_auto/products/carousel/Assist.png",
    ctaLink: "",
    ctaText: "",
    xs: "6",
  },
  {
    variant: "outlined",
    primaryText: "Intercity",
    imageLink:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png",
    ctaLink: "",
    ctaText: "",
    xs: "6",
  },
];
export default function Home() {
  return (
    <div style={{ width: "95vw", paddingLeft: "20px", paddingTop: "20px" }}>
      <Grid container spacing={2}>
        {homeTiles.map((tile) => {
          return (
            <Grid item xs={tile.xs}>
              <Link href={tile.ctaLink} underline="hover" style={{}}>
                <Card variant={tile.variant}>
                  <CardContent>
                    <Typography color="text.primary" variant="h6" gutterBottom>
                      {tile.primaryText}
                    </Typography>
                    <img
                      src={tile.imageLink}
                      width={tile.width || "100%"}
                      alt=""
                    />
                  </CardContent>
                  {tile.ctaLink && (
                    <CardActionArea>
                      <Button size="small" color="primary">
                        {tile.ctaText}
                      </Button>
                    </CardActionArea>
                  )}
                  <CardHeader></CardHeader>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
