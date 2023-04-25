import { TextField, Button, Box } from "@mui/material";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context";
import formatApiUrl from "../../utilities/format-api-url";
import isObjectEmpty from "../../utilities/is-object-empty";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import formLayout from "./form-layout";

const logIn = async (credentials) => {
    const url = formatApiUrl("/authentication/logIn");
    const response = await axios.post(url, credentials);
    const data = response.data;

    return data;
};

export default ({ setIsLoading, setRequestError, setValidationError }) => {
    const [_, setSessionData] = useAtom(sessionDataAtom);

    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        }
    });

    const handleSubmit = async (values) => {
        if (!isObjectEmpty(form.errors)) {
            setValidationError(form.errors);
            return;
        }

        mutation.mutate(values);
        form.reset();
    }

    const handleSuccess = (data) => {
      setSessionData({
        username: data.username,
        token: data.token,
      });
    };

    const mutation = useTrackedMutation(
        logIn,
        setIsLoading,
        setRequestError,
        {
            onSuccess: handleSuccess
        }
    );

    return (
        <Box sx={formLayout}>
            <TextField
                label="Nombre de usuario"
                type="text"
                {...form.getInputProps("username")}
            />

            <TextField
                label="Contraseña"
                type="password"
                {...form.getInputProps("password")}
            />

            <Button
                variant="text"
                onClick={form.onSubmit((values) => handleSubmit(values))}
            >
                Iniciar sesión
            </Button>
        </Box>
    );
};
