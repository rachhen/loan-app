import React, { Fragment, Suspense } from "react"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import {
  Stack,
  Box,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Button,
  AspectRatio,
  Image,
  HStack,
  Text,
} from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import { dateFormat } from "app/core/utils/helpers/dateFormat"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import PageHeader from "app/core/components/page-header"
import { ImageUpload } from "types"
import buildUrl from "cloudinary-build-url"

const transformations = {
  resize: {
    type: "fill",
    width: 250,
    height: 250,
  },
}

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [product] = useQuery(getProduct, { id: productId })

  const src = product.image
    ? buildUrl((product.image as ImageUpload).public_id, { transformations })
    : "/noimage.png"

  return (
    <Fragment>
      <NextSeo title={`View Product ${product.name}`} />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>View Product </PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/products">Products</PageHeader.Breadcrumbs.Item>
            <PageHeader.Breadcrumbs.Item href="#">View</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>
        <Box layerStyle="card" boxShadow="base" rounded="2xl" px="5" pb="5">
          <HStack>
            <Box w="20%">
              <Text pb="2">Thumbnail</Text>
              <AspectRatio maxW="250px" ratio={4 / 3} borderRadius="lg" overflow="hidden">
                <Image src={src} alt={product.name} objectFit="cover" />
              </AspectRatio>
            </Box>
            <Table variant="simple" w="80%">
              <Tbody>
                <Tr>
                  <Th>ID</Th>
                  <Td>{product.id}</Td>
                </Tr>
                <Tr>
                  <Th>Name</Th>
                  <Td>{product.name}</Td>
                </Tr>
                <Tr>
                  <Th>Created At</Th>
                  <Td>{dateFormat(product.createdAt)}</Td>
                </Tr>
                <Tr>
                  <Th>Updated At</Th>
                  <Td>{dateFormat(product.updatedAt)}</Td>
                </Tr>
                <Tr>
                  <Th>Status</Th>
                  <Td>
                    <Tag size="sm" colorScheme={product.status ? "green" : "red"}>
                      {product.status ? "Active" : "Inactive"}
                    </Tag>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </HStack>

          <Box pt="5">
            <Button type="button" onClick={() => router.push(`/products/${product.id}/edit`)}>
              Edit
            </Button>

            <Button
              type="button"
              colorScheme="red"
              ml="2"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteProductMutation({ id: product.id })
                  router.push("/products")
                }
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Stack>
    </Fragment>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
