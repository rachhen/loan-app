import React from "react"
import { NextSeo } from "next-seo"
import { useRouter, useMutation, BlitzPage } from "blitz"
import { Box } from "@chakra-ui/layout"
import { Stack } from "@chakra-ui/react"
import { CategoryForm, FORM_ERROR } from "app/categories/components/CategoryForm"
import { CreateCategory } from "app/categories/validations"
import Layout from "app/core/layouts/Layout"
import createCategory from "app/categories/mutations/createCategory"
import PageHeader from "app/core/components/page-header"

const NewCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <React.Fragment>
      <NextSeo title="Create New Category" />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Create New Category</PageHeader.Title>
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
            schema={CreateCategory}
            initialValues={{ name: "", status: true }}
            onSubmit={async (values) => {
              try {
                const category = await createCategoryMutation(values)
                router.push(`/categories/${category.id}`)
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
    </React.Fragment>
  )
}

NewCategoryPage.authenticate = { redirectTo: "/login" }
NewCategoryPage.getLayout = (page) => <Layout title={"Create New Category"}>{page}</Layout>

export default NewCategoryPage
