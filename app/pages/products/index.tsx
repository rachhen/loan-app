import { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"
import React from "react"
import { NextSeo } from "next-seo"
import PageHeader from "app/core/components/page-header"
import { Box, Button, HStack, IconButton, Stack, Tag } from "@chakra-ui/react"
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import { SampleTable } from "app/core/components/SampleTable"
import { dateFormat } from "app/core/utils/helpers/dateFormat"
import Pagination from "@choc-ui/paginator"
import deleteProduct from "app/products/mutations/deleteProduct"
import { Column } from "react-table"
import { Product } from "db"

const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [{ products, count }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
  })

  const columns = React.useMemo<Column<Product>[]>(
    () => [
      {
        Header: "#",
        maxWidth: 50,
        Cell: (row) => {
          return parseInt(row.row.id) + 1
        },
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => dateFormat(value),
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ cell: { value } }) => dateFormat(value),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => (
          <Tag size="sm" colorScheme={value ? "green" : "red"}>
            {value ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        _Cell: ({ cell: { value } }) => (
          <HStack spacing={2}>
            <Link href={`/products/${value}`}>
              <a>
                <IconButton size="xs" aria-label="view" icon={<ViewIcon />} />
              </a>
            </Link>
            <Link href={`/products/${value}/edit`}>
              <a>
                <IconButton size="xs" colorScheme="blue" aria-label="edit" icon={<EditIcon />} />
              </a>
            </Link>
            <IconButton
              size="xs"
              colorScheme="red"
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteProductMutation({ id: value })
                  router.push("/products")
                }
              }}
            />
          </HStack>
        ),
        get Cell() {
          return this._Cell
        },
        set Cell(value) {
          this._Cell = value
        },
      },
    ],
    [deleteProductMutation, router]
  )

  const Prev = (props) => <Button {...props}>Prev </Button>
  const Next = (props) => <Button {...props}> Next </Button>

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev
    }
    if (type === "next") {
      return Next
    }
  }

  return (
    <Stack spacing={4}>
      <SampleTable columns={columns} data={products} />
      <Pagination
        current={page}
        total={count}
        pageSize={ITEMS_PER_PAGE}
        pageNeighbours={1}
        showTotal={(total) => `${total} Items`}
        paginationProps={{ display: "flex", mb: 5 }}
        onChange={(p) => router.push({ query: { page: p } })}
        itemRender={itemRender}
      />
    </Stack>
  )
}

const ProductsPage: BlitzPage = () => {
  return (
    <React.Fragment>
      <NextSeo title="Products" />
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Products</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/products">Products</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
          <PageHeader.Actions>
            <Link href="/products/new">
              <Button as="a" leftIcon={<AddIcon />} _hover={{ cursor: "pointer" }}>
                Add
              </Button>
            </Link>
          </PageHeader.Actions>
        </PageHeader>
        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsList />
          </Suspense>
        </Box>
      </Stack>
    </React.Fragment>
  )
}

ProductsPage.authenticate = { redirectTo: "/login" }
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
