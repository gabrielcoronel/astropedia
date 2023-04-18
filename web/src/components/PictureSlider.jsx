import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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
        <Box>
            <IconButton onClick={(_) => previous()}>
                <ArrowLeft />
            </IconButton>

            <img
                style={{ height: "100%", width: "80%" }}
                src={pictures[currentIndex]}
            />

            <IconButton onClick={(_) => next()}>
                <ArrowRight />
            </IconButton>
        </Box>
    );
};