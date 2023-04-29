import { useState } from "react";
import {
    Tabs,
    Tab,
    CircularProgress,
    Box,
    Snackbar,
    Alert,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

// Formatea un mensaje de error conveniente
const formatErrorMessage = (requestError, validationError) => {
  // Si hay error de validación
    if (validationError !== null) {
      // Se accede al mensaje de error
        const message = Object.entries(validationError)[0][1];

        return message;
    } else if (requestError !== null) {
      // Si hay error en la solicitud
      // Se formatea condicionalmente
        switch (requestError.response.data) {
            case "INVALID_CREDENTIALS":
                return "Las credenciales son incorrectas"
            case "USERNAME_TAKEN":
                return "Este nombre de usuario ya existe"
        }
    }

  // Si no hay error, no se produce un mensaje
    return null;
};

const ErrorBox = ({ open, setOpen, message }) => {
    return (
        <Snackbar
            autoHideDuration={5000}
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={(_) => setOpen(false)}
        >
            <Alert severity="error">
                {message}

                <IconButton onClick={(_) => setOpen(false)}>
                    <Close />
                </IconButton>
            </Alert>
        </Snackbar>
    );
};

const FormBox = ({ setIsLoading, setRequestError, setValidationError }) => {
  // Estado del indice actual de la pestaña
    const [index, setIndex] = useState(0);

  // Estilo del contenedor del componente
    const layout = {
        width: "40%",
        paddingBottom: "1.5rem",
        border: "1px silver solid"
    };

  // Lista de pestañas
    const tabs = [
        <SignUp
            setIsLoading={setIsLoading}
            setRequestError={setRequestError}
            setValidationError={setValidationError}
        />,
        <LogIn
            setIsLoading={setIsLoading}
            setRequestError={setRequestError}
            setValidationError={setValidationError}
        />
    ];

    return (
        <Box sx={layout}>
            <Tabs
                value={index}
                onChange={(_, newIndex) => setIndex(newIndex)}
                centered
                variant="fullWidth"
            >
                <Tab label="Crea una cuenta"></Tab>
                <Tab label="Inicia sesión"></Tab>
            </Tabs>

            {tabs[index]}
        </Box>
    );
};

export default () => {
  // Estado de carga
    const [isLoading, setIsLoading] = useState(false);
  // Estado del error de solicitud actual
    const [requestError, setRequestError] = useState(null);
  // Estado del error de validación actual
    const [validationError, setValidationError] = useState(null);

  // Se formatea el error actual
    const errorMessage = formatErrorMessage(requestError, validationError);

  // Estilo del contenedor del componente
    const layout = {
        width: "100hh",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <Box sx={layout}>
            <ErrorBox
                open={errorMessage !== null}
                setOpen={(boolean) => boolean ? null : setRequestError(null)}
                message={errorMessage}
            />

            {
                isLoading ?
                <CircularProgress /> :
                <FormBox
                    setIsLoading={setIsLoading}
                    setRequestError={setRequestError}
                    setValidationError={setValidationError}
                />
            }
        </Box>
    );
};
