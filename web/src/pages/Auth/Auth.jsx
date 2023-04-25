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

const formatErrorMessage = (requestError, validationError) => {
    if (validationError !== null) {
        const message = Object.entries(validationError)[0][1];

        return message;
    } else if (requestError !== null) {
        switch (requestError.response.data) {
            case "INVALID_CREDENTIALS":
                return "Las credenciales son incorrectas"
            case "USERNAME_TAKEN":
                return "Este nombre de usuario ya existe"
        }
    }

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
    const [index, setIndex] = useState(0);

    const layout = {
        width: "40%",
        paddingBottom: "1.5rem",
        border: "1px silver solid"
    };

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
    const [isLoading, setIsLoading] = useState(false);
    const [requestError, setRequestError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    const errorMessage = formatErrorMessage(requestError, validationError);

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
