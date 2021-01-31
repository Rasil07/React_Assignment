import React from "react";
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { red, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: "1.3rem",
    fontWeight: "light",
  },
  cancelButton: {
    backgroundColor: red[600],
    color: "white",
    "&:hover": {
      backgroundColor: red[500],
    },
  },
  submitButton: {
    backgroundColor: blue[600],
    color: "white",
    "&:hover": {
      backgroundColor: blue[500],
    },
  },
}));
export default function CustomModal(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.handleCancel();
    props.setOpen(false);
  };

  return (
    <>
      <Modal isOpen={props.open} size={props.size ? props.size : ""}>
        <Form id="form" onSubmit={props.handleSubmit}>
          <ModalHeader className={classes.header}>
            {props.title || "Modal Title"}
          </ModalHeader>
          <ModalBody>
            {props.children || "No child elements supplied."}
          </ModalBody>
          <ModalFooter>
            <FormGroup>
              {props.handleCancel ? (
                <Button className={classes.cancelButton} onClick={handleClose}>
                  Close
                </Button>
              ) : (
                <Button
                  cclassName={classes.cancelButton}
                  onClick={() => props.setOpen(!props.open)}
                >
                  Close
                </Button>
              )}
              {props.handleSubmit ? (
                <Button
                  className={classes.submitButton}
                  type="submit"
                  style={{ marginLeft: 5 }}
                >
                  Submit
                </Button>
              ) : (
                ""
              )}
            </FormGroup>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
