import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routes from "./pages/Routes";
import "./App.css";
import { theme } from "./Theme";

const AppWrapper = styled.div`
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 24px;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <ContentWrapper>
            <Routes />
          </ContentWrapper>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
