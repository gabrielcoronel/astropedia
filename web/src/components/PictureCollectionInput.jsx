import { IconButton, Box, useTheme } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useState, useRef } from "react";
import encodeFile from "../utilities/encode-file";
import { v4 as generateKey } from "uuid";

const layout = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%"
};

const encodeAllFiles = (files) => {
    const fileArray = [...files];
    const promises = fileArray.map(encodeFile);
    const wholePromise = Promise.all(promises);

    return wholePromise;
};

const PictureTile = ({ picture, handleDelete }) => {
    const primaryColor = useTheme().palette.primary.dark;

    return (
        <img
            style={{
                border: `1px solid ${primaryColor}`,
                width: "70px",
                height: "70px" 
            }}
            onClick={handleDelete}
            src={picture}
        />
    );
};

export default ({ handleAddPictures }) => {
    const fileInputReference = useRef(null);
    const [pictures, setPictures] = useState([]);

    const handleClick = (_) => {
        fileInputReference.current.click();
    };

    const handleChangeFiles = async (event) => {
        let files = event.target.files;

        if (files === null) {
            return;
        }

        const encodedFiles = await encodeAllFiles(files);
        const newPictures = encodedFiles
            .map((file) => ({ key: generateKey(), source: file}));

        setPictures([...pictures, ...newPictures]);

        const sources = [...pictures, ...newPictures]
            .map((picture) => picture.source);

        handleAddPictures(sources);
    };

    const deletePicture = (key) => {
        const newPictures = pictures.filter((picture) => picture.key != key);

        setPictures(newPictures);
    };

    const picturesElements = pictures
        .map((picture) => {
            return <PictureTile
                key={picture.key}
                picture={picture.source}
                handleDelete={() => deletePicture(picture.key)}
            />;
        });

    return (
        <>
            <input
                ref={fileInputReference}
                onChange={handleChangeFiles}
                type="file"
                style={{ display: "none" }}
                multiple
            />

            <Box
                sx={layout}
            >
                {picturesElements}

                <IconButton onClick={handleClick}>
                    <AddPhotoAlternate />
                </IconButton>
            </Box>
        </>
    );
};