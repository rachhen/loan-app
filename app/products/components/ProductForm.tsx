import { useQuery } from "@blitzjs/core"
import { Box, HStack, VStack } from "@chakra-ui/layout"
import getCategories from "app/categories/queries/getCategories"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SelectField from "app/core/components/SelectField"
import SwitchField from "app/core/components/SwitchField"
import { TextareaField } from "app/core/components/TextareaField"
import { ImageUploadField } from "app/core/components/ImageUploadField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{ categories }] = useQuery(getCategories, { where: { status: true } })

  return (
    <Form<S> {...props}>
      <HStack spacing="5">
        <Box width="18%">
          <ImageUploadField name="file" initialValue={props.initialValues?.image} />
        </Box>
        <VStack w="80%" spacing="5" align="stretch">
          <HStack spacing="5" align="flex-start">
            <LabeledTextField name="name" label="Name" placeholder="Name" />
            <SelectField name="categoryId" label="Category" placeholder="Select Category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </SelectField>
            <LabeledTextField name="price" label="Price" min={0} type="number" />
          </HStack>
          <TextareaField name="description" label="Description" />
        </VStack>
      </HStack>
      <SwitchField name="status" label="Status" />
    </Form>
  )
}
