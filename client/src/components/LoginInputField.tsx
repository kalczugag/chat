import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";

type TInputField = {
    name: string;
    type: string;
};

const InputField = ({ name, type }: TInputField) => {
    const required = (value: string) => (value ? undefined : "Required");

    return (
        <div>
            <Field name={name} validate={required}>
                {({ input }) => (
                    <TextField
                        {...input}
                        className="w-full rounded bg-login-input"
                        type={type}
                        label={name.charAt(0).toUpperCase() + name.slice(1)}
                    />
                )}
            </Field>
        </div>
    );
};

export default InputField;
