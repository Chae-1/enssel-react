import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

const emptyForm = () => {
    return {
        name: '',
        id: '',
        password: '',
    };
};

const RegisterUserModalContent = ({ dispatch }) => {
    const [form, setForm] = useState(emptyForm());

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    const onClick = () => {
        const sendForm = {
            ...form
        };
        setForm(emptyForm())
        dispatch({type: "SUBMIT_FORM", form: sendForm});
    }

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

            <Button onClick={onClick}>등록</Button>
        </>
    );
};

export default RegisterUserModalContent;