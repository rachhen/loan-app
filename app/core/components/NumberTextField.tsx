import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react"
import React, { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface NumberTextFieldProps extends PropsWithoutRef<NumberInputProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
}

export const NumberTextField = forwardRef<HTMLInputElement, NumberTextFieldProps>(
  ({ name, label, readonly, required, disabled, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, invalid, submitError, submitting },
    } = useField(name, { parse: Number })

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
        <NumberInput
          {...input}
          isInvalid={touched && invalid}
          disabled={submitting}
          {...props}
          ref={ref}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default NumberTextField
