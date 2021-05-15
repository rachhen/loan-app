import React, { Fragment, Suspense } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { NextSeo } from "next-seo"
import { Box, Stack } from "@chakra-ui/react"
import PageHeader from "app/core/components/page-header"
import { UpdateProduct } from "app/products/validations"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { setQueryData }] = useQuery(getProduct, { id: productId })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <Fragment>
      <NextSeo title={`Update Product ${product.name}`} />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Update {product.name}</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/products">Products</PageHeader.Breadcrumbs.Item>
            <PageHeader.Breadcrumbs.Item href="#">Edit</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <ProductForm
            submitText="Update Product"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={UpdateProduct}
            initialValues={product}
            onSubmit={async (values) => {
              try {
                if (values.file) {
                  const formData = new FormData()
                  formData.append("file", values.file[0])
                  formData.append("upload_preset", "loan-app")
                  const endpoint = "https://api.cloudinary.com/v1_1/woufu/upload"
                  const image = await fetch(endpoint, {
                    method: "POST",
                    body: formData,
                  }).then((res) => res.json())

                  values.image = image
                  delete values.file
                }
                const updated = await updateProductMutation({
                  id: product.id,
                  ...values,
                })
                await setQueryData(updated)
                router.push(`/products/${updated.id}`)
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

const EditProductPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProduct />
    </Suspense>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
