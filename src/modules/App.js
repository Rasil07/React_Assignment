import React from "react";

import Dishes from "./dishes/container";
import { Container } from "reactstrap";
function App() {
  return (
    <Container className="mt-4">
      <Dishes />
    </Container>
  );
}

export default App;
