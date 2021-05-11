import { ReactNode, PropsWithoutRef } from "react"
import { Button, ButtonProps } from "@chakra-ui/button"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import { chakra } from "@chakra-ui/system"
import { Box, Stack } from "@chakra-ui/layout"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  renderButton?: (submitting: boolean) => React.ReactNode
  buttonProps?: ButtonProps
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  renderButton,
  buttonProps,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <chakra.form onSubmit={handleSubmit} {...props}>
          <Stack spacing={4}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            {submitError && <chakra.div color="red.300">{submitError}</chakra.div>}

            {submitText && !renderButton && (
              <Box>
                <Button
                  type="submit"
                  bg={"brand.400"}
                  color={"white"}
                  disabled={submitting}
                  isLoading={submitting}
                  _hover={{
                    bg: "brand.500",
                  }}
                  {...buttonProps}
                >
                  {submitText}
                </Button>
              </Box>
            )}
            {renderButton && renderButton(submitting)}
          </Stack>
        </chakra.form>
      )}
    />
  )
}

export default Form
