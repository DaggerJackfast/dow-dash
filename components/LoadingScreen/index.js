import React from "react";
import Container from "../Container";
import Loader from "../Loader";

const LoadingScreen = () => (
  <Container className="min-h-screen flex">
    <div className="m-auto">
      <Loader />
    </div>
  </Container>
);
export default LoadingScreen;
