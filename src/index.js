import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import Routes from "./Routes";
import "driver.js/dist/driver.min.css";

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ChakraProvider>
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
