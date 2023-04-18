import { Box, Typography, CircularProgress } from "@mui/material";
import formatDate from "../../utilities/format-date";
import PictureSlider from "../../components/PictureSlider";
import { useQuery } from "react-query";
import axios from "axios";

const getUserEvents = () => {
    const authenticationToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const url = formatApiUrl("/events/getUserEvents");
    const promise = axios.post(url, { username }, {
        headers: {
            Authorization: authenticationToken
        }
    });

    return promise;
};

const EventTile = ({ event }) => {
    const { title, description, pictures, date } = event;

    return (
        <Box>
            <Typography variant="h4" align="center">
                {title}
            </Typography>

            <Typography variant="caption" align="left">
                {formatDate(date)}
            </Typography>

            <Box>
                <Typography sx={{ width: "40%" }}>
                    {description}
                </Typography>

                <Box sx={{ width: "40%", height: "6rem"}} >
                    <PictureSlider pictures={pictures} />
                </Box>
            </Box>
        </Box>
    );
};

const EventList = () => {
    const query = useQuery("allEvents", getUserEvents);

    if (query.isLoading) {
        return <CircularProgress />;
    }


    // manejar el error

    // tirar el componente

    return null;
};