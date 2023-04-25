import { TextField, Button, Box } from "@mui/material";
import { useForm } from "@mantine/form";
import axios from "axios";
import PictureInput from "../../components/PictureInput";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context";
import formatApiUrl from "../../utilities/format-api-url";
import isObjectEmpty from "../../utilities/is-object-empty";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import formLayout from "./form-layout";

const signUp = async (account) => {
    const url = formatApiUrl("/authentication/signUp");
    const response = await axios.post(url, account);
    const data = response.data;

    return data;
};

export default ({ setIsLoading, setRequestError, setValidationError }) => {
    const [_, setSessionData] = useAtom(sessionDataAtom);
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            picture: ""
        },
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
      signUp,
      setIsLoading,
      setRequestError,
      {
        onSuccess: handleSuccess
      }
    );

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
