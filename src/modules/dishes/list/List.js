import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Select,
  TextField,
  MenuItem,
  FormControl,
  Typography,
  InputLabel,
} from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as ACTIONTYPES from "../../../redux/types/dish.actions.types";
import DishCard from "../card";
import { grey, deepOrange, blue } from "@material-ui/core/colors";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import CustomModal from "../../global/CustomModal";

const useStyles = makeStyles((theme) => ({
  logo: {
    color: deepOrange[500],
    fontFamily: "'Poppins', sans-serif",
  },
  addFilterBtn: {
    backgroundColor: blue[700],
    color: "white",
    border: "none",
    "&:hover": {
      backgroundColor: blue[800],
    },
    marginBottom: "5px",
  },

  filterLabel: {
    color: grey[50],
    display: "inline-block",
    fontSize: "1rem",
    width: "20%",
  },
  filterInput: {
    color: grey[50],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    width: "fit-content",
    float: "right",
    fontSize: ".8rem",
  },
  addButton: {
    width: "fit-content",
    float: "right",
    fontSize: ".8rem",
    marginLeft: "auto",
  },
  orange: {
    backgroundColor: deepOrange[500],
    color: grey[50],
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: deepOrange[400],
      color: grey[100],
    },
  },
  filterParmasContainer: {
    borderBottom: "0.5px solid",
    borderBottomColor: deepOrange[400],
    paddingBottom: "1.2rem",
  },

  filterParams: {
    border: ".5px solid rgba(255,255,255,0.4)",
    borderRadius: "0.4rem",
    color: grey[50],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    height: "2rem",
    padding: "0 .5rem",
    background: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.7)",
      color: "rgba(0,0,0,0.6)",
    },
  },
}));

function List() {
  const classes = useStyles();
  const [filterArray, setFilterArray] = useState([]);
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false);
  const allDishes = useSelector((state) => state.allDishes.dishes);
  const [dish, setDish] = useState({
    name: "",
    ingridients: [],
  });
  const [content, setContent] = useState("");
  const [ingridient, setIngridient] = useState({});
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  function handleFormSubmit(e) {
    e.preventDefault();
    const payload = { dish, file, content };
    dispatch({ type: ACTIONTYPES.ADD_REQUEST, payload });
    handleClose();
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const formats = ["bold", "italic", "underline", "list", "bullet"];

  function showMessage(value) {
    setMessage(value);
    setTimeout(() => {
      setMessage(null);
    }, 500);
  }
  const changeIngridients = (e) => {
    setIngridient((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const addIngridient = () => {
    if (Object.keys(ingridient).length < 0) return;
    if (
      !ingridient.ingridientName ||
      !ingridient.ingridientQuantity ||
      !ingridient.ingridientMetrics
    ) {
      showMessage("All feilds are required");
      return;
    }
    setDish((dish) => ({
      ...dish,
      ingridients: [...dish.ingridients, ingridient],
    }));
    setIngridient({});
  };

  const handleContentChange = async (content) => {
    setContent(content);
  };
  const fetchAllDishes = (query) => {
    dispatch({ type: ACTIONTYPES.LIST_REQUEST, query });
  };
  const addFilter = () => {
    if (!filter) return;
    if (filterArray.includes(filter)) {
      setFilter(null);
      return;
    }
    setFilterArray([...filterArray, filter]);
    setFilter(null);
    return;
  };
  function changeDish(e) {
    setDish((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleClose() {
    setOpen(false);
    setIngridient({});
    setDish({
      name: "",
      ingridients: [],
    });
    setContent("");
    setFile(null);
  }
  const fileChangedHandler = (event) => {
    let file_size = event.target.files[0].size;
    let file_type = event.target.files[0].type;
    if (file_size > 100000) {
      alert("Please upload photo of max size 100 KB!");
      event.target.value = null;
    }
    file_type = file_type.split("/")[1];
    const validFileType = ["jpeg", "jpg", "png"].includes(file_type);
    if (!validFileType) {
      alert("Unsupported File type! Please upload JPEG, JPG, PNG File");
      event.target.value = null;
    }
    setFile(event.target.files[0]);
    return;
  };

  useEffect(() => {
    fetchAllDishes(filterArray);
  }, [filterArray]);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className="mb-3"
        spacing={2}
      >
        <Grid item xs={5} className="mr-auto">
          <Typography variant="h4" className={classes.logo}>
            {" "}
            Recipe
          </Typography>
        </Grid>

        <Grid item xs={4} className="mr-3">
          <div style={{ display: "flex" }}>
            <TextField
              value={filter ? filter : ""}
              onChange={(e) => setFilter(e.target.value)}
              type="text"
              label="Filter by Ingridient"
              placeholder="Enter Ingidient"
              color="secondary"
              variant="standard"
              InputProps={{
                className: classes.filterInput,
                endAdornment: (
                  <Button
                    onClick={() => addFilter()}
                    className={classes.addFilterBtn}
                  >
                    <AddIcon />
                  </Button>
                ),
              }}
            />
          </div>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.orange}
            onClick={() => setOpen(!open)}
          >
            Add Dish
          </Button>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", width: "100%" }}
        className={classes.filterParmasContainer}
      >
        <div className={classes.filterLabel}>Filter Parameters :</div>
        {filterArray && filterArray.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gridColumnGap: "10px",
              width: "100%",
              columnWidth: "fit-content",
            }}
          >
            {filterArray.map((item, index) => (
              <span
                onClick={() =>
                  setFilterArray((prev) => prev.filter((itm) => itm !== item))
                }
              >
                <p key={index} className={classes.filterParams}>
                  <DeleteForeverSharpIcon /> &nbsp; {item}
                </p>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className="p-3 "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gridColumnGap: "10px",
        }}
      >
        {allDishes && allDishes.length > 0
          ? allDishes.map((item, index) => (
              <div className="mb-4">
                <DishCard key={index} item={item} />
              </div>
            ))
          : "No dish found"}
      </div>

      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Add Dish"
        size="lg"
        handleCancel={handleClose}
        handleSubmit={handleFormSubmit}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gridColumnGap: "30px",
            alignItems: "center",
          }}
        >
          <TextField
            name="name"
            type="text"
            label="Name of Dish"
            placeholder="Enter Dish name"
            value={dish && dish.name ? dish.name : ""}
            onChange={(e) => changeDish(e)}
          />
          <Button
            variant="contained"
            component="label"
            color="secondary"
            className={classes.uploadButton}
          >
            Upload File
            <input
              type="file"
              name="file"
              hidden
              onChange={fileChangedHandler}
              required
            />
          </Button>
          {file ? <p>{file.name}</p> : "No file selected"}
        </div>

        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridColumnGap: "10px",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            label="Ingridient"
            name="ingridientName"
            placeholder="Enter Ingridient"
            value={
              ingridient && ingridient.ingridientName
                ? ingridient.ingridientName
                : ""
            }
            onChange={(e) => changeIngridients(e)}
          />
          <div className="d-flex align-items-center justify-content-between">
            <TextField
              type="number"
              label="Quantity"
              name="ingridientQuantity"
              placeholder="Enter quantity"
              className={classes.formControl}
              value={
                ingridient && ingridient.ingridientQuantity
                  ? ingridient.ingridientQuantity
                  : ""
              }
              onChange={(e) => changeIngridients(e)}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Metrics
              </InputLabel>
              <Select
                name="ingridientMetrics"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="ml-4 "
                onChange={(e) => changeIngridients(e)}
                value={
                  ingridient && ingridient.ingridientMetrics
                    ? ingridient.ingridientMetrics
                    : ""
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="gm">gm</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="ltr">ltr</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
                <MenuItem value="kgs">kgs</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => addIngridient()}
          >
            <AddIcon />
          </Button>
          {message && <p>{message}</p>}
        </div>
        <br />
        <InputLabel>Steps</InputLabel>
        <ReactQuill
          name="steps"
          modules={modules}
          formats={formats}
          value={content}
          placeholder="Write the Steps to cook the dish"
          theme={"snow"}
          style={{ height: "150px" }}
          onChange={(e) => handleContentChange(e)}
        />
        <br />
        <br />
      </CustomModal>
    </>
  );
}

export default List;
