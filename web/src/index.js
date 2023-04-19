import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Auth from "./pages/Auth/Auth";
import EventForm from "./pages/Events/EventForm";
import { useState } from "react";
import EventList from "./pages/Events/EventList";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: indigo
  }
});

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);

  if (isLoading) {
    return "Cargando...";
  }

  if (requestError !== null) {
    return "Error";
  }

  return <EventForm setIsLoading={setIsLoading} setRequestError={setRequestError} />;
};

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EventList />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);