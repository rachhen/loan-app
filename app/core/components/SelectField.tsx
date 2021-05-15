import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { SelectProps } from "@chakra-ui/select"
import { forwardRef, PropsWithoutRef, ReactNode } from "react"
import { useField } from "react-final-form"

export interface SelectFieldProps extends PropsWithoutRef<SelectProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  isStringValue?: boolean
  children: ReactNode
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, disabled, readonly, required, isStringValue, children, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, invalid, submitError, submitting },
    } = useField(name, { parse: !isStringValue ? Number : undefined })

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
        <Select
          {...input}
          disabled={submitting}
          isInvalid={invalid && touched}
          {...props}
          ref={ref}
        >
          {children}
        </Select>
        {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default SelectField
