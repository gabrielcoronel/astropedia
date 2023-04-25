import { IconButton, Box, useTheme } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useState, useRef } from "react";
import encodeFile from "../utilities/encode-file";
import { v4 as generateKey } from "uuid";

// Estilo del componente
const layout = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%"
};

// Lee los contenidos de varios objetos File
// con encodeFile en una sola promesa
const encodeAllFiles = (files) => {
    // Se asegura de que files sea un vector ordinario,
    // puede ser un HTMLList
    const fileArray = [...files];

    // Aplica encodeFile en todos los archivos
    const promises = fileArray.map(encodeFile);

    // Crea una nueva promesa para todas las lecturas
    const wholePromise = Promise.all(promises);

    return wholePromise;
};

// Cuadro que muestra una imagen
const PictureTile = ({ picture, handleDelete }) => {
    // Lee el color actual del tema
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

// Componente para que el usuario ingrese varias fotos
// para un evento astronómico
export default ({ handleAddPictures }) => {
    // Referencia al input tipo file
    const fileInputReference = useRef(null);

    // Estado para las foto ingresadas
    const [pictures, setPictures] = useState([]);

    // Activa el evento de click el input tipo file
    const handleClick = (_) => {
        fileInputReference.current.click();
    };

    // Handler para cuendo se seleccionen archivos
    const handleChangeFiles = async (event) => {
        let files = event.target.files;

        // Si no hay archivos no se hace nada
        if (files === null) {
            return;
        }

        // Se leen todos los archvos
        const encodedFiles = await encodeAllFiles(files);

        // Se insertan llaves únicos para que React puede borrar cuadros
        // de imagen
        const newPictures = encodedFiles
            .map((file) => ({ key: generateKey(), source: file}));

        // Se actualiza la lista de archivos en el estado
        setPictures([...pictures, ...newPictures]);

        // Se leen solos contendios del fotos
        const sources = [...pictures, ...newPictures]
            .map((picture) => picture.source);

        // Para pasarselas al handler de componente padre
        handleAddPictures(sources);
    };

    // Handler para borrar un cuadro de imagen
    const deletePicture = (key) => {
        // Se genera un nuevo vector sin la imagen que tenga la key dada
        const newPictures = pictures.filter((picture) => picture.key != key);

        // Se actualiza el estado de las imagenes con el vector
        setPictures(newPictures);
    };

    // Se generan cuadros de fotor en base al vector de estado
    // iterando sobre este y utilizando el respectivo componente
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