import { TextField, Button, Box } from "@mui/material";
import { useForm } from "@mantine/form";
import axios from "axios";
import PictureInput from "../../components/PictureInput";
import formatApiUrl from "../../utilities/format-api-url";
import isObjectEmpty from "../../utilities/is-object-empty";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import formLayout from "./form-layout";

const signUp = (account) => {
    const url = formatApiUrl("/authentication/signUp");
    const promise = axios.post(url, account);

    return promise;
};

export default ({ setIsLoading, setRequestError, setValidationError }) => {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            picture: ""
        },
    });
    const mutation = useTrackedMutation(signUp, setIsLoading, setRequestError);

    const handleSubmit = async (values) => {
        if (!isObjectEmpty(form.errors)) {
            setValidationError(form.errors);
            return;
        }

        mutation.mutate(values);
        form.reset();
    }

    return (
        <Box sx={formLayout}>
            <PictureInput
                handleInput={(picture) => form.setFieldValue("picture", picture)}
            />

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
                Crear cuenta
            </Button>
        </Box>
    );
};