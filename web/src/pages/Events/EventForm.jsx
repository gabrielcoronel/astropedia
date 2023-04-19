import { Box, TextField, Button } from "@mui/material";
import { Textarea } from "@mui/joy";
import { DateCalendar } from "@mui/x-date-pickers";
import { useForm } from "@mantine/form";
import PictureCollectionInput from "../../components/PictureCollectionInput";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import { useQueryClient } from "react-query";
import axios from "axios";
import formatApiUrl from "../../utilities/format-api-url";

const layouts = {
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "55%",
        padding: "1.5rem",
        backgroundColor: "white"
    },
    inputs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "3rem"
    },
    firstHalf: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2.5rem",
        flexGrow: "1"
    },
    secondHalf: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    pictures: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
        width: "60%"
    }
};

const storeEvent = (event) => {
    const authenticationToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const url = formatApiUrl("/events/storeEvent");
    const promise = axios.post(url, { ...event, username }, {
        headers: {
            Authorization: authenticationToken
        }
    });

    return promise;
};

export default ({ onSubmit, setIsLoading, setRequestError }) => {
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            pictures: [],
            date: null
        }
    });
    const mutation = useTrackedMutation(storeEvent, setIsLoading, setRequestError);
    const queryClient = useQueryClient();

    const handleSubmit = (values) => {
        mutation.mutate(values);
        queryClient.refetchQueries();
        form.reset();
        onSubmit();
    };

    return (
        <Box sx={layouts.form} >
            <Box sx={layouts.inputs} >
                <Box sx={layouts.firstHalf}>
                    <TextField
                        label="Título"
                        type="text"
                        {...form.getInputProps("title")}
                    />

                    <Textarea
                        placeholder="Descripción"
                        minRows={4}
                        {...form.getInputProps("description")}
                    />
                </Box>

                <Box sx={layouts.secondHalf}>
                    <DateCalendar
                        onChange={(date) => form.setFieldValue("date", date.toDate())}
                    />

                </Box>
            </Box>

            <Box sx={layouts.pictures}>
                <PictureCollectionInput
                    handleAddPictures={(pictures) => form.setFieldValue("pictures", pictures)}
                />
            </Box>

            <Button
                variant="text"
                onClick={form.onSubmit((values) => handleSubmit(values))}
            >
                Añadir evento
            </Button>
        </Box>
    );
};