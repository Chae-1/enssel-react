import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";

const emptyForm = () => {
    return {
        name: '',
        id: '',
        password: '',
    };
}

const EditUserModalContent = ({dispatch, selectedItem}) => {

    const [form, setForm] = useState({
        id: selectedItem.id,
        name: selectedItem.name,
        password: selectedItem.password,
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({...prevForm, [name]: value}));
    };

    const onClick = () => {
        const sendForm = {
            ...form
        };
        console.log(selectedItem);
        setForm(emptyForm());
        dispatch({type: "SUBMIT_FORM", form: sendForm});
    }

    return (
        <>
            <TextField
                required
                margin="normal"
                id="add-id"
                label="아이디"
                name="id"
                value={form.id}
                onChange={onChange}
                fullWidth
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
            />

            <TextField
                required
                margin="normal"
                label="이름"
                id="add-name"
                name="name"
                value={form.name}
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
                value={form.password}
                onChange={onChange}
                fullWidth
            />

            <Button onClick={onClick}>수정</Button>
        </>

    );
};
export default EditUserModalContent;