import { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLoaners from "app/loaners/queries/getLoaners"
import React from "react"
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import { Stack, Button, Box, Tag, HStack, IconButton } from "@chakra-ui/react"
import PageHeader from "app/core/components/page-header"
import { dateFormat } from "app/core/utils/helpers/dateFormat"
import Pagination from "@choc-ui/paginator"
import { Loaner } from "db"
import { Column } from "react-table"
import deleteLoaner from "app/loaners/mutations/deleteLoaner"
import { SampleTable } from "app/core/components/SampleTable"

const ITEMS_PER_PAGE = 100

export const LoanersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [deleteLoanerMutation] = useMutation(deleteLoaner)
  const [{ loaners, count }] = usePaginatedQuery(getLoaners, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
  })

  const columns = React.useMemo<Column<Loaner>[]>(
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
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
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
            <Link href={`/loaners/${value}`}>
              <a>
                <IconButton size="xs" aria-label="view" icon={<ViewIcon />} />
              </a>
            </Link>
            <Link href={`/loaners/${value}/edit`}>
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
                  await deleteLoanerMutation({ id: value })
                  router.push("/loaners")
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
    [deleteLoanerMutation, router]
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
      <SampleTable columns={columns} data={loaners} />
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

const LoanersPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Stack spacing={4}>
      <PageHeader>
        <PageHeader.Title>Loaners</PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Breadcrumbs.Item href="/loaners">Loaners</PageHeader.Breadcrumbs.Item>
        </PageHeader.Breadcrumbs>
        <PageHeader.Actions>
          <Button
            type="button"
            leftIcon={<AddIcon />}
            onClick={async () => await router.push("/loaners/new")}
          >
            Add
          </Button>
        </PageHeader.Actions>
      </PageHeader>
      <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
        <Suspense fallback={<div>Loading...</div>}>
          <LoanersList />
        </Suspense>
      </Box>
    </Stack>
  )
}

LoanersPage.authenticate = true
LoanersPage.getLayout = (page) => <Layout title="Loaners">{page}</Layout>

export default LoanersPage
