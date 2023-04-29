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

// Estilos de los varios componentes de este archivo
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

// Obtiene los eventos astronomicos de un usuario mediante la API
const getUserEvents = async () => {
  // Lee la información de la sesión actual
    const { username, token } = readSessionData();
  // Formatea la URL de la API
    const url = formatApiUrl("/events/getUserEvents");
  // Realiza la consulta
    const response = await axios.post(url, { username }, {
        headers: {
            Authorization: token
        }
    });
  // Lee los datos de respuesta
    const data = response.data;

    return data;
};

// Elimina un evento astronomico mediante la API
const deleteEvent = (id) => {
  // Se lee el token de autenticación de los datos de la sesión actual
    const { token } = readSessionData();
  // Se formatea la URL de la API
    const url = formatApiUrl("/events/deleteEvent");
  // Se realiza la consulta
    const promise = axios.post(url, { id }, {
        headers: {
            Authorization: token
        }
    });

    return promise;
};

// Componente para un evento astronomico individual
const EventTile = ({ setIsLoading, setRequestError, event }) => {
  // Se leen los datos del evento
    const { title, description, pictures, date } = event;
  // Mutación para eliminar el evento en cuestión
    const mutation = useTrackedMutation(deleteEvent, setIsLoading, setRequestError);

  // Handler para cuando se borra el evento
    const handleDelete = () => {
      // Se lee el identificador del evento
        const id = event._id;

      // Se realiza la mutación
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

// Componente para mostrar una lista de todos los
// componentes del usuario
const EventList = ({ setIsLoading, setRequestError }) => {
  // Consulta de todos los eventos
    const query = useQuery("allEvents", getUserEvents);

  // Si hay un error
    if (query.isError) {
      // Se le notifica al componente padre
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

// Envoltoria de la lista para manejar todo el estado
export default () => {
  // Estado booleano de si se muestra el modal
    const [showStoreForm, setShowStoreForm] = useState(false);
  // Estado de carga
    const [isLoading, setIsLoading] = useState(false);
  // Esto del último error de solicitud
    const [requestError, setRequestError] = useState(null);
  // Estado global de la sesión de datos global
    const [_, setSessionData] = useAtom(sessionDataAtom);

  // Handler para cerrar sesión
    const logOut = () => {
      // Se convierten los datos de la sesión actual en nulos
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
