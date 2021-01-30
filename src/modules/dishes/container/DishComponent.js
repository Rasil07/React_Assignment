import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DishList from "../list";
import DishDetails from "../details";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomModal from "../../global/CustomModal";
import * as ACTION from "../../../redux/types/dish.actions.types";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function DishComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const details = useSelector((state) => state.allDishes.details);

  function handleClose() {
    dispatch({ type: ACTION.SELECT_DISH_DETAILS });
  }

  useEffect(() => {
    if (!details) return;
    setOpen(!open);
  }, [details]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <DishList />

        <CustomModal
          open={open}
          setOpen={setOpen}
          handleCancel={handleClose}
          title={details ? `${details.name} Recipe` : ""}
          size="xl"
        >
          <DishDetails details={details} />
        </CustomModal>
      </Grid>
    </div>
  );
}

export default DishComponent;
