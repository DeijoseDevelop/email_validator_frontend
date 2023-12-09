'use client';

import { useForm, SubmitHandler } from "react-hook-form"
import { Alert, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import FileUpload from "./fileUploads";
import { useState } from "react";
import useLoader from "../loader/Loader";

type Inputs = {
    email: string;
}

export default function HomeForm() {
    const [ email, setEmail ] = useState<string>("");
    const [ isEmailValid, setIsEmailValid ] = useState<boolean | null>(null);
    const { LoaderComponent, openLoader, closeLoader } = useLoader();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email } = data;

        try {
            openLoader();
            const response = await axios.post(
                "/api/email",
                JSON.stringify({ email }),
            )
            setTimeout(()=> {
                setIsEmailValid(response.data.results);
                setEmail(email);
                closeLoader();
            }, 2000);
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <LoaderComponent />
            <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    marginTop: 80,
                }}
            >
                <Stack sx={{ mb: 2 }} direction="row" justifyContent="center" alignItems="start">
                    <Stack>
                        <TextField
                            type="email"
                            placeholder="Enter email"
                            {...register("email", { required: true })}
                            InputProps={{ style: { color: "#FFF" } }}
                            sx={{
                                mb: 2,
                                '& label.Mui-focused': {
                                    color: '#FFF',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#FFF',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#FFF',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#FFF',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFF',
                                    },
                                },
                            }}
                        />
                        {errors.email && <Alert severity="error">This field is required</Alert>}
                        <Button variant="contained" type="submit">SEND</Button>
                    </Stack>
                    <FileUpload />
                </Stack>
                {
                    (isEmailValid !== null && isEmailValid) &&
                    <Alert severity="success">The email: {email} is valid.</Alert>
                }
                {
                    (isEmailValid !== null && !isEmailValid) &&
                    <Alert severity="error">The email: {email} is not valid.</Alert>
                }
            </form>
        </>
    );
}