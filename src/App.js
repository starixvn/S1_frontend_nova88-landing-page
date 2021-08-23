import React from "react";
import path from "./path";
import { Router, createHistory, LocationProvider } from "@reach/router";
import Join from "./pages/join";
import Wrapper from "./components/wrapper";
import PopBox from "./components/popBox";

const Index = () => {
  let history = createHistory(window);
  return (
    <Wrapper>
      <LocationProvider history={history}>
        <Join path={path.join.root} default />
        <PopBox />
      </LocationProvider>
    </Wrapper>
  );
};

export default Index;
