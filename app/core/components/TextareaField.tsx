import { forwardRef, PropsWithRef } from "react"
import { FormControl, FormErrorMessage, FormLabel, Textarea, TextareaProps } from "@chakra-ui/react"
import { useField } from "react-final-form"

export interface TextareaFieldProps extends PropsWithRef<TextareaProps> {
  name: string
  label: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ name, label, required, readonly, disabled, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, invalid, submitError, submitting },
    } = useField(name)

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
        <Textarea
          {...input}
          id={name}
          placeholder={label}
          disabled={submitting}
          isInvalid={invalid && touched}
          {...props}
          ref={ref}
        />
        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)
