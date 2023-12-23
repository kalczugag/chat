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
                {(props) => (
                    <TextField
                        type={type}
                        name={props.input.name}
                        error={props.meta.touched}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        label={name.charAt(0).toUpperCase() + name.slice(1)}
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                            style: { color: "white" },
                        }}
                        className="w-full rounded bg-login-input text-white"
                    />
                )}
            </Field>
        </div>
    );
};

export default InputField;
