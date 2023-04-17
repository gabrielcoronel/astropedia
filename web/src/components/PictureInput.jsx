import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useRef, useState } from "react";
import encodeFile from "../utilities/encode-file";

export default ({ handleInput }) => {
    const [picture, setPicture] = useState(null);
    const fileInputReference = useRef(null);

    const handleClick = (_) => {
        fileInputReference.current.click();
    };

    const handleChange = async (event) => {
        const files = event.target.files;

        if (!files || !files[0]) {
            return;
        }

        const picture = await encodeFile(files[0]);
        setPicture(picture);

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