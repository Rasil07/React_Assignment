import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import * as ACTION from "../../../redux/types/dish.actions.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActions,
} from "@material-ui/core";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import "react-quill/dist/quill.snow.css";
import NoImg from "../../../assets/no_image.png";

import FastfoodSharpIcon from "@material-ui/icons/FastfoodSharp";
const useStyles = makeStyles((theme) => ({
  typography: {
    width: "100%",
    position: "relative",
    display: "flex",
    height: "2.5rem",
    // overflow: "hidden",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  showButton: {
    width: "fit-content",
    fontSize: ".5rem",
    marginRight: "auto",
    marginLeft: "auto",

    opacity: "0.6",
  },
  dishCard: {
    maxWidth: "220px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  ingridientLabel: {
    color: "rgba(0,0,0,0.7)",
    float: "left",
    width: "fit-content",
  },
}));
function DishCard({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  function setDishDetails() {
    dispatch({ type: ACTION.SELECT_DISH_DETAILS, payload: { ...props.item } });
  }
  return (
    <Card className={classes.dishCard}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <FastfoodSharpIcon />
          </Avatar>
        }
        title={`${props && props.item && props.item.name}`}
      />
      <CardMedia
        className={classes.media}
        image={
          props && props.item && props.item.image ? props.item.image : NoImg
        }
      />
      <PerfectScrollbar>
        <CardContent className={classes.cardContent}>
          <p className={classes.ingridientLabel}>Ingridient</p>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.typography}
          >
            {props && props.item && props.item.ingridients
              ? props.item.ingridients.map(
                  (item1, index) =>
                    `${item1.ingridientName} ${
                      props.item.ingridients.length - 1 > index ? "," : ""
                    }`
                )
              : "No Ingridients"}
          </Typography>
        </CardContent>
      </PerfectScrollbar>

      <CardActions>
        <IconButton
          aria-label="show"
          className={classes.showButton}
          onClick={() => setDishDetails()}
        >
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default DishCard;
