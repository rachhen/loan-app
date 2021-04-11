import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react"
import React, { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  required?: boolean
  readonly?: boolean
  disabled?: boolean
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, readonly, required, disabled, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, invalid, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl
        id={name}
        isDisabled={disabled}
        isReadOnly={readonly}
        isRequired={required}
        isInvalid={invalid && touched}
      >
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input {...input} disabled={submitting} {...props} ref={ref} />
        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledTextField
