import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";

const EditUserModalContent = ({dispatch, selectedItem}) => {
    const [form, setForm] = useState({
        name: selectedItem.name,
        id: selectedItem.id,
        password: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    return (
        <>
            <TextField
                required
                margin="normal"
                label="이름"
                id="add-name"
                name="name"
                onChange={onChange}
                fullWidth
            />

            <TextField
                required
                margin="normal"
                id="add-id"
                label="아이디"
                name="id"
                onChange={onChange}
                fullWidth
            />


            <TextField
                required
                margin="normal"
                type="password"
                id="add-password"
                name="password"
                label="패스워드"
                onChange={onChange}
                fullWidth
            />

            <Button onClick={() => dispatch({type: "CLOSE", form: form})}>수정</Button>
        </>

    );
};
export default EditUserModalContent;