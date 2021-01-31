import React from "react";

import Dishes from "./dishes/container";
import { Container } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    margin: "0",
    padding: "0",
    minHeight: "100vh",
    background: "#232526" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #414345, #232526)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #414345, #232526)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
  containerWrap: {
    width: "100%",
    margin: "0 auto",
    padding: "2rem .5rem .5rem .5rem",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container className={classes.containerWrap}>
        <Dishes />
      </Container>
    </div>
  );
}

export default App;
