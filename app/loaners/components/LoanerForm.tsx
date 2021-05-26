import { Box, HStack, VStack } from "@chakra-ui/layout"
import { Form, FormProps } from "app/core/components/Form"
import { ImageUploadField } from "app/core/components/ImageUploadField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SwitchField from "app/core/components/SwitchField"
import { TextareaField } from "app/core/components/TextareaField"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function LoanerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <HStack spacing="5" align="stretch">
        <Box w="18%">
          <ImageUploadField name="files" initialValue={props.initialValues?.photo} />
        </Box>
        <VStack w="80%" align="stretch">
          <HStack spacing="5" align="stretch">
            <LabeledTextField name="firstName" label="First Name" />
            <LabeledTextField name="lastName" label="Last Name" />
            <LabeledTextField name="phoneNumber" label="Phone Number" />
            <LabeledTextField name="address" label="Address" />
            <LabeledTextField name="city" label="City" />
          </HStack>
          <TextareaField name="description" label="Description" />
        </VStack>
      </HStack>
      <SwitchField name="status" label="Status" />
    </Form>
  )
}
