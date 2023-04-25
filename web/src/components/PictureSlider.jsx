import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const layout = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "8rem",
    height: "6rem"
};

export default ({ pictures }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        const length = pictures.length;
        const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;

        setCurrentIndex(newIndex);
    };

    const previous = () => {
        const length = pictures.length;
        const newIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;

        setCurrentIndex(newIndex);
    };

    return (
        <Box sx={layout}>
            <IconButton onClick={(_) => previous()}>
                <ArrowLeft />
            </IconButton>

            <img
                style={{ height: "100%", width: "100%" }}
                src={pictures[currentIndex]}
            />

            <IconButton onClick={(_) => next()}>
                <ArrowRight />
            </IconButton>
        </Box>
    );
};
