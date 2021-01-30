import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import KitchenIcon from "@material-ui/icons/Kitchen";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CardContent,
  CardHeader,
  Grid,
  TableContainer,
  Paper,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

// import { Row, Col, Input, Label } from "reactstrap";
import CustomModal from "../../global/CustomModal";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function List() {
  const [filterArray, setFilterArray] = useState([]);
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false);
  const allDishes = useSelector((state) => state.allDishes.dishes);
  const [dish, setDish] = useState(null);
  const fetchAllDishes = (query) => {
    console.log("query", query);
  };
  const addFilter = () => {
    console.log("clicked");
    if (!filter) return;

    setFilterArray([...filterArray, filter]);
    setFilter(null);
    return;
  };
  function changeDish(e) {
    setDish({
      [e.target.name]: e.target.value,
    });
  }

  useEffect(fetchAllDishes, []);
  return (
    <>
      <Card>
        <CardHeader
          avatar={<KitchenIcon />}
          className="mb-0 p-3 border-bottom bg-light"
          title="Dish"
        />

        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className="mb-3"
            spacing={2}
          >
            <Grid
              item
              xs={4}
              direction="row"
              alignItems="center"
              className="mr-3"
            >
              <div style={{ display: "flex" }}>
                <TextField
                  value={filter ? filter : ""}
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                  label="Filter by Ingridient"
                  placeholder="Enter Ingidient"
                />
                <Button onClick={() => addFilter()}>
                  <AddIcon />
                </Button>
              </div>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(!open)}
              >
                Add Dish
              </Button>
            </Grid>
          </Grid>

          <div
            className="p-3 "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gridColumnGap: "10px",
            }}
          >
            {filterArray &&
              filterArray.map((item, index) => (
                <span
                  onClick={() =>
                    setFilterArray((prev) => prev.filter((itm) => itm !== item))
                  }
                >
                  <p key={index} className="mr-3">
                    {item}
                  </p>
                </span>
              ))}
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dish</TableCell>
                  <TableCell>Ingridients</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allDishes && allDishes.length > 0
                  ? allDishes.map((item, index) => (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.ingredients}</TableCell>
                      </TableRow>
                    ))
                  : "No Dish Found"}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <CustomModal open={open} setOpen={setOpen} title="Add Dish" size="lg">
        <TextField
          name="dish"
          type="text"
          label="Name of Dish"
          placeholder="Enter Dish name"
          value={dish && dish.name}
          onChange={(e) => changeDish(e)}
        />
        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridColumnGap: "10px",
          }}
        >
          <TextField
            type="text"
            label="Ingridient"
            placeholder="Enter Ingridient"
          />
          <div className="d-flex">
            <TextField
              type="number"
              label="Quantity"
              placeholder="Enter quantity"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Metrics
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="ml-4 "
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="gm">gm</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
                <MenuItem value="kgs">kgs</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default List;
