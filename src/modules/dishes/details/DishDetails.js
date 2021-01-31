import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Grid,
  InputLabel,
  Card,
  CardMedia,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoImg from "../../../assets/no_image.png";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "250px",
    height: "210px",
    paddingTop: "56.25%", // 16:9
  },
  tableContent: {
    width: "100%",
    height: "300px",
    position: "relative",
  },
}));

function DishDetails({ props }) {
  const classes = useStyles();
  const modules = {
    toolbar: false,
  };

  return (
    <div>
      <Grid container>
        <Grid item>
          <Card>
            <CardMedia
              className={classes.media}
              image={
                props && props.details && props.details.image
                  ? props.details.image
                  : NoImg
              }
            />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridColumnGap: "10px",
              alignItems: "left",
              marginLeft: "1rem",
            }}
          >
            <div className="form-group">
              <InputLabel>Name of Dish :</InputLabel>
              {props && props.details && props.details.name
                ? props.details.name
                : ""}
            </div>
            <PerfectScrollbar>
              <div className={classes.tableContent}>
                <InputLabel>Ingridients :</InputLabel>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ingridient Name</TableCell>
                      <TableCell> Quantity</TableCell>
                      <TableCell> Metrics</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props && props.details && props.details.ingridients
                      ? props.details.ingridients.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.ingridientName}</TableCell>
                            <TableCell>{item.ingridientQuantity}</TableCell>
                            <TableCell>{item.ingridientMetrics}</TableCell>
                          </TableRow>
                        ))
                      : "No ingredient available"}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </div>
        </Grid>
      </Grid>
      <br />

      <ReactQuill
        modules={modules}
        value={
          props && props.details && props.details.steps
            ? props.details.steps
            : ""
        }
        readOnly
      />
    </div>
  );
}

export default DishDetails;
