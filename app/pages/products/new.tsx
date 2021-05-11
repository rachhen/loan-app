import { useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import React, { Suspense } from "react"
import { NextSeo } from "next-seo"
import { Box, Spinner, Stack } from "@chakra-ui/react"
import PageHeader from "app/core/components/page-header"
import { CreateProduct } from "app/products/validations"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <React.Fragment>
      <NextSeo title="Create New Product" />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Create New Product</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/products">Products</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <Suspense fallback={<Spinner />}>
            <ProductForm
              submitText="Save"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={CreateProduct}
              initialValues={{ status: true }}
              onSubmit={async (values) => {
                try {
                  const product = await createProductMutation(values)
                  router.push(`/products/${product.id}`)
                } catch (error) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </Suspense>
        </Box>
      </Stack>
    </React.Fragment>
  )
}

NewProductPage.authenticate = true
NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
