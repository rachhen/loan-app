import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SwitchField from "app/core/components/SwitchField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CategoryForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" />
      <SwitchField name="status" label="Status" />
    </Form>
  )
}
