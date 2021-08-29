import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./state/store";

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("renders learn react link", () => {
  renderApp();
  const linkElement = screen.getByText("MUI table here");
  expect(linkElement).toBeInTheDocument();
});
