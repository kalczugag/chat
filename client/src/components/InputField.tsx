import { useState } from "react";
import { Field } from "react-final-form";

type InputFieldTypes = {
    name: string;
};

const InputField = ({ name }: InputFieldTypes) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    const required = (value: string) => (value ? undefined : "Required");

    return (
        <div className="relative">
            {isEmpty && (
                <label
                    className={`absolute bg-login-input px-1 rounded text-xs left-4 top-1 ${
                        isFocused ? "hidden" : "block"
                    } text-gray-300 pointer-events-none z-10`}
                >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
            )}
            <Field name={name} validate={required}>
                {({ input }) => (
                    <input
                        {...input}
                        className="relative p-2 w-full rounded bg-login-input"
                        type="text"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            setIsEmpty(input.value.trim() === "");
                        }}
                        onChange={(e) => {
                            setIsEmpty(e.target.value.trim() === "");
                            input.onChange(e);
                        }}
                    />
                )}
            </Field>
        </div>
    );
};

export default InputField;
