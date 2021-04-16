import { FormControl, FormErrorMessage, FormLabel, Switch } from "@chakra-ui/react"
import { SwitchProps } from "@chakra-ui/switch"
import React, { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface SwitchFieldProps extends PropsWithoutRef<SwitchProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
}

const SwitchField = forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ name, label, disabled, readonly, required, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, invalid, submitError, submitting },
    } = useField(name, { type: "checkbox" })

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
        <Switch
          {...input}
          defaultChecked={input.checked}
          disabled={submitting}
          colorScheme="brand"
          isInvalid={touched && invalid}
          {...props}
          ref={ref}
        />
        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default SwitchField
