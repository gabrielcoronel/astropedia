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

// Se registra a un usuario mediante la API
const signUp = async (account) => {
  // Formatea la URL de la API
    const url = formatApiUrl("/authentication/signUp");
  // Se realiza la consulta
    const response = await axios.post(url, account);
  // Se leen los datos
    const data = response.data;

    return data;
};

export default ({ setIsLoading, setRequestError, setValidationError }) => {
  // Se consume el estado global de la sesión actual
    const [_, setSessionData] = useAtom(sessionDataAtom);
  // Se usa una conveniencia para el manejo de formulario
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            picture: ""
        },
    });

  // Handler para cuando se sube el formulario
    const handleSubmit = async (values) => {
      // Si hay errores de validación
        if (!isObjectEmpty(form.errors)) {
          // Se actualizan estos en el componente padre
            setValidationError(form.errors);
            return;
        }

      // De lo contrario, se realiza la mutación
        mutation.mutate(values);
      // Y se limpia el formulario
        form.reset();
    }

  // Handler para el case exitoso de la súbida del formulario
    const handleSuccess = (data) => {
      // Se actualizan los datos de la sesión actual
      setSessionData({
        username: data.username,
        token: data.token,
      });
    };

  // Mutación para registrarse
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
