import React, { Suspense, Fragment } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCategory from "app/categories/queries/getCategory"
import deleteCategory from "app/categories/mutations/deleteCategory"
import { Table, Tr, Th, Tbody, Td, Stack, Box, Tag, Button } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import PageHeader from "app/core/components/page-header"
import { dateFormat } from "app/core/utils/helpers/dateFormat"

export const Category = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [deleteCategoryMutation] = useMutation(deleteCategory)
  const [category] = useQuery(getCategory, { id: categoryId })

  return (
    <Fragment>
      <NextSeo title={`View Category ${category.name}`} />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>View Category {category.name}</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/categories">Categories</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>
        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>ID</Th>
                <Td>{category.id}</Td>
              </Tr>
              <Tr>
                <Th>Name</Th>
                <Td>{category.name}</Td>
              </Tr>
              <Tr>
                <Th>Created At</Th>
                <Td>{dateFormat(category.createdAt)}</Td>
              </Tr>
              <Tr>
                <Th>Updated At</Th>
                <Td>{dateFormat(category.updatedAt)}</Td>
              </Tr>
              <Tr>
                <Th>Status</Th>
                <Td>
                  <Tag size="sm" colorScheme={category.status ? "green" : "red"}>
                    {category.status ? "Active" : "Inactive"}
                  </Tag>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Box pt="5">
            <Link href={`/categories/${category.id}/edit`}>
              <Button as="a" _hover={{ bg: "default", cursor: "pointer" }}>
                Edit
              </Button>
            </Link>

            <Button
              type="button"
              colorScheme="red"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteCategoryMutation({ id: category.id })
                  router.push("/categories")
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Stack>
    </Fragment>
  )
}

const ShowCategoryPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Category />
    </Suspense>
  )
}

ShowCategoryPage.authenticate = true
ShowCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCategoryPage
