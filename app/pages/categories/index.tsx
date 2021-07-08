import React, { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import { Box, Button, HStack, IconButton, Stack, Tag } from "@chakra-ui/react"
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import { Category } from "db"
import { Column } from "react-table"
import { SampleTable } from "app/core/components/SampleTable"
import { dateFormat } from "app/core/utils/helpers/dateFormat"
import Pagination from "@choc-ui/paginator"
import Layout from "app/core/layouts/Layout"
import getCategories from "app/categories/queries/getCategories"
import PageHeader from "app/core/components/page-header"
import deleteCategory from "app/categories/mutations/deleteCategory"
import Loading from "app/core/components/Loading"

const ITEMS_PER_PAGE = 8

export const CategoriesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ categories, count }] = usePaginatedQuery(getCategories, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
  })
  const [deleteCategoryMutation] = useMutation(deleteCategory)

  const columns = React.useMemo<Column<Category>[]>(
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
        Cell: ({ cell: { value } }) => (
          <HStack spacing={2}>
            <Link href={`/categories/${value}`}>
              <a>
                <IconButton size="xs" aria-label="view" icon={<ViewIcon />} />
              </a>
            </Link>
            <Link href={`/categories/${value}/edit`}>
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
                  await deleteCategoryMutation({ id: value })
                  router.push("/categories")
                }
              }}
            />
          </HStack>
        ),
      },
    ],
    [deleteCategoryMutation, router]
  )

  const itemRender = (_, type) => {
    const Prev = (props) => <Button {...props}>Prev </Button>
    const Next = (props) => <Button {...props}> Next </Button>
    if (type === "prev") {
      return Prev
    }
    if (type === "next") {
      return Next
    }
  }

  return (
    <>
      <SampleTable columns={columns} data={categories} />
      <Pagination
        current={page}
        total={count}
        pageSize={ITEMS_PER_PAGE}
        pageNeighbours={1}
        showTotal={(total) => `${total} Items`}
        paginationProps={{ display: "flex", mt: 5 }}
        onChange={(p) => router.push({ query: { page: p } })}
        itemRender={itemRender}
      />
    </>
  )
}

const CategoriesPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Stack spacing={4}>
      <PageHeader>
        <PageHeader.Title>Categories</PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Breadcrumbs.Item href="/categories">Categories</PageHeader.Breadcrumbs.Item>
        </PageHeader.Breadcrumbs>
        <PageHeader.Actions>
          <Button
            type="button"
            leftIcon={<AddIcon />}
            onClick={async () => await router.push("/categories/new")}
          >
            Add
          </Button>
        </PageHeader.Actions>
      </PageHeader>
      <Box layerStyle="table" boxShadow="base" rounded="2xl" p="5">
        <Suspense fallback={<Loading />}>
          <CategoriesList />
        </Suspense>
      </Box>
    </Stack>
  )
}

CategoriesPage.authenticate = { redirectTo: "/login" }
CategoriesPage.getLayout = (page) => <Layout title="Categories">{page}</Layout>

export default CategoriesPage
