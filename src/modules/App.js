import React from "react";

import { Provider } from "react-redux";
import store from "../redux/store";
import Dishes from "./dishes/list";
import { Container } from "reactstrap";
function App() {
  return (
    <Provider store={store}>
      {" "}
      <Container className="mt-4">
        <Dishes />
      </Container>
    </Provider>
  );
}

export default App;
