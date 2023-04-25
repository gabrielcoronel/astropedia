import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useRef, useState } from "react";
import encodeFile from "../utilities/encode-file";

// Componente para que el usuario ingrese una foto de perfil
export default ({ handleInput }) => {
    // Estado para representar la imagen actual, por defecto nulo
    const [picture, setPicture] = useState(null);

    // Referencia al input de tipo file en el DOM
    const fileInputReference = useRef(null);

    // Activa el evento click en el input
    const handleClick = (_) => {
        fileInputReference.current.click();
    };

    // Handler para cuando se seleccione un archivo
    const handleChange = async (event) => {
        const files = event.target.files;

        // Si no hay archivos seleccionados no se hace nada
        if (!files || !files[0]) {
            return;
        }

        // Se leen los contenidos del archivo en formato DataURL
        const picture = await encodeFile(files[0]);

        // Se actualiza el estaoo de la foto actual
        setPicture(picture);

        // Se ejecuta la acción arbitraria dada por el componente padre
        handleInput(picture);
    };

    return (
        <>
            <input
                ref={fileInputReference}
                onChange={handleChange}
                type="file"
                style={{ display: "none" }}
            />

            <div
                onClick={handleClick}
            >
                {
                    picture !== null ?
                    <Avatar src={picture} sx={{ height: "5rem", width: "5rem" }} /> :
                    <AccountCircle sx={{ fontSize: "5rem" }} />
                }
            </div>
        </>
    );
};