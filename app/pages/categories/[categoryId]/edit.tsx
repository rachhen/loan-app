import { Suspense, Fragment } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import { Box, Stack, useToast } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import { CategoryForm, FORM_ERROR } from "app/categories/components/CategoryForm"
import { UpdateCategory } from "app/categories/validations"
import Layout from "app/core/layouts/Layout"
import getCategory from "app/categories/queries/getCategory"
import updateCategory from "app/categories/mutations/updateCategory"
import PageHeader from "app/core/components/page-header"

export const EditCategory = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [category, { setQueryData }] = useQuery(getCategory, { id: categoryId })
  const [updateCategoryMutation] = useMutation(updateCategory)
  const toast = useToast()

  return (
    <Fragment>
      <NextSeo title={`Edit Category ${category.name}`} />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Edit Category {category.name}</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/categories">Categories</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <CategoryForm
            submitText="Save"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={UpdateCategory}
            initialValues={category}
            onSubmit={async (values) => {
              try {
                const updated = await updateCategoryMutation({
                  id: category.id,
                  ...values,
                })
                await setQueryData(updated)
                toast({
                  title: "Category updated.",
                  description: `You've updated category from ${category.name} to ${updated.name}.`,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
                router.push(`/categories/${updated.id}`)
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Box>
      </Stack>
    </Fragment>
  )
}

const EditCategoryPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCategory />
    </Suspense>
  )
}

EditCategoryPage.authenticate = true
EditCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCategoryPage
