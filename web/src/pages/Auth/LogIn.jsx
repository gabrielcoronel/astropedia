import { TextField, Button, Box } from "@mui/material";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context";
import formatApiUrl from "../../utilities/format-api-url";
import isObjectEmpty from "../../utilities/is-object-empty";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import formLayout from "./form-layout";

// Inicia sesión mediante la API
const logIn = async (credentials) => {
  // Se formatea la URL de la API
    const url = formatApiUrl("/authentication/logIn");
  // Se hace la solicitud
    const response = await axios.post(url, credentials);
  // Se leen los datos
    const data = response.data;

    return data;
};

export default ({ setIsLoading, setRequestError, setValidationError }) => {
  // Se consume el estado global con los datos de la sesión actual
    const [_, setSessionData] = useAtom(sessionDataAtom);

  // Se usa una conveniencia para manejar el estado del formulario
    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        }
    });

  // Handler para la subida del formulario
    const handleSubmit = async (values) => {
      // Si hay error se actualiza el error de validación en el
      // componente padre
        if (!isObjectEmpty(form.errors)) {
            setValidationError(form.errors);
            return;
        }

      // De lo contrario se realiza la mutación
        mutation.mutate(values);
      // Se limpia el formulario
        form.reset();
    }

  // Handler para cuando de sube el formulario con exito
    const handleSuccess = (data) => {
      // Se actualizan los datos de la sesión actual
      setSessionData({
        username: data.username,
        token: data.token,
      });
    };

  // Mutación para iniciar sesión
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
