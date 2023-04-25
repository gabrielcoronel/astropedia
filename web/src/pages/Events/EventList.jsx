import {
    Fab,
    Box,
    Typography,
    CircularProgress,
    Modal,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton
} from "@mui/material";
import { Add, Delete, Logout } from "@mui/icons-material";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context";
import formatDate from "../../utilities/format-date";
import formatApiUrl from "../../utilities/format-api-url";
import readSessionData from "../../utilities/read-session-data";
import EventForm from "./EventForm";
import useTrackedMutation from "../../hooks/useTrackedMutation";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const layouts = {
    tile: {
        width: "40%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "1.5rem",
        border: "1px solid #1976d2",
        borderRadius: "15px"
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    fab2: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 90,
        left: 'auto',
        position: 'fixed'
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    list: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "2rem"
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        border: "none",
        outline: "none"
    }
};

const getUserEvents = async () => {
    const { username, token } = readSessionData();
    const url = formatApiUrl("/events/getUserEvents");
    const response = await axios.post(url, { username }, {
        headers: {
            Authorization: token
        }
    });
    const data = response.data;

    return data;
};

const deleteEvent = (id) => {
    const { token } = readSessionData();
    const url = formatApiUrl("/events/deleteEvent");
    const promise = axios.post(url, { id }, {
        headers: {
            Authorization: token
        }
    });

    return promise;
};

const EventTile = ({ setIsLoading, setRequestError, event }) => {
    const { title, description, pictures, date } = event;
    const mutation = useTrackedMutation(deleteEvent, setIsLoading, setRequestError);

    const handleDelete = () => {
        const id = event._id;

        mutation.mutate(id);
    };

    return (
      <Card sx={{ width: "45%" }}>
        <CardMedia
          component="img"
          sx={{ height: "20rem" }}
          image={pictures[0]}
        >
        </CardMedia>

        <CardContent>
            <Typography
                variant="h5"
            >
                {title}
            </Typography>

            <Typography
                variant="subtitle2"
            >
                {formatDate(date)}
            </Typography>

          <Typography>
          {description}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton onClick={() => handleDelete()}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    );
};

const EventList = ({ setIsLoading, setRequestError }) => {
    const query = useQuery("allEvents", getUserEvents);

    if (query.isError) {
        setRequestError(query.error);
        return;
    }

    return (
        <Box sx={layouts.list}>
            {
                query.isLoading ?
                    <CircularProgress /> :
                    query.data.map((event) => {
                        const key = event._id;

                        return (
                            <EventTile
                                setIsLoading={setIsLoading}
                                setRequestError={setRequestError}
                                key={key}
                                event={event}
                            />
                        );
                    })
            }
        </Box>
    );
};

export default () => {
    const [showStoreForm, setShowStoreForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [requestError, setRequestError] = useState(null);
    const [_, setSessionData] = useAtom(sessionDataAtom);

    const logOut = () => {
      setSessionData(null);
    };

    return (
        <Box>
            <EventList
                setIsLoading={setIsLoading}
                setRequestError={setRequestError}
            />

            <Modal
                open={showStoreForm}
                onClose={() => setShowStoreForm(false)}
            >
                <div style={layouts.modal}>
                    <EventForm
                        setIsLoading={setIsLoading}
                        setRequestError={setRequestError}
                        onSubmit={() => setShowStoreForm(false)}
                    />
                </div>
            </Modal>


            <Fab
                sx={layouts.fab2}
                onClick={() => logOut()}
            >
                <Logout />
            </Fab>

            <Fab
                sx={layouts.fab}
                onClick={() => setShowStoreForm(true)}
            >
                <Add />
            </Fab>
        </Box>
    );
};
