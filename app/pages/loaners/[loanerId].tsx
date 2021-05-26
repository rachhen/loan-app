import React, { Suspense } from "react"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLoaner from "app/loaners/queries/getLoaner"
import deleteLoaner from "app/loaners/mutations/deleteLoaner"
import { ImageUpload } from "types"
import buildUrl from "cloudinary-build-url"
import { Image } from "app/core/components/Image"
import {
  Stack,
  Box,
  HStack,
  AspectRatio,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Button,
  Text,
} from "@chakra-ui/react"
import PageHeader from "app/core/components/page-header"
import { dateFormat } from "app/core/utils/helpers/dateFormat"

const transformations = {
  resize: {
    type: "fill",
    width: 250,
    height: 250,
  },
}

export const Loaner = () => {
  const router = useRouter()
  const loanerId = useParam("loanerId", "number")
  const [deleteLoanerMutation] = useMutation(deleteLoaner)
  const [loaner] = useQuery(getLoaner, { id: loanerId })

  const src = loaner.photo
    ? buildUrl((loaner.photo as ImageUpload).public_id, {
        cloud: {
          cloudName: "woufu",
        },
        transformations,
      })
    : "/noimage.png"

  return (
    <Stack spacing={4}>
      <PageHeader>
        <PageHeader.Title>View Loaner </PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Breadcrumbs.Item href="/loaners">Loaners</PageHeader.Breadcrumbs.Item>
          <PageHeader.Breadcrumbs.Item href="#">View</PageHeader.Breadcrumbs.Item>
        </PageHeader.Breadcrumbs>
      </PageHeader>
      <Box layerStyle="card" boxShadow="base" rounded="2xl" px="5" pb="5">
        <HStack align="stretch">
          <Box w="20%" pt="3">
            <Text pb="2">Thumbnail</Text>
            <AspectRatio maxW="250px" ratio={4 / 3} borderRadius="lg" overflow="hidden">
              <Image src={src} alt={loaner.firstName} objectFit="cover" />
            </AspectRatio>
          </Box>
          <Table variant="simple" w="80%">
            <Tbody>
              <Tr>
                <Th>ID</Th>
                <Td>{loaner.id}</Td>
              </Tr>
              <Tr>
                <Th>First Name</Th>
                <Td>{loaner.firstName}</Td>
              </Tr>
              <Tr>
                <Th>Last Name</Th>
                <Td>{loaner.lastName}</Td>
              </Tr>
              <Tr>
                <Th>Created At</Th>
                <Td>{dateFormat(loaner.createdAt)}</Td>
              </Tr>
              <Tr>
                <Th>Updated At</Th>
                <Td>{dateFormat(loaner.updatedAt)}</Td>
              </Tr>
              <Tr>
                <Th>Status</Th>
                <Td>
                  <Tag size="sm" colorScheme={loaner.status ? "green" : "red"}>
                    {loaner.status ? "Active" : "Inactive"}
                  </Tag>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </HStack>

        <Box pt="5">
          <Button type="button" onClick={() => router.push(`/loaners/${loaner.id}/edit`)}>
            Edit
          </Button>

          <Button
            type="button"
            colorScheme="red"
            ml="2"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteLoanerMutation({ id: loaner.id })
                router.push("/loaners")
              }
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}

const ShowLoanerPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Loaner />
    </Suspense>
  )
}

ShowLoanerPage.authenticate = true
ShowLoanerPage.getLayout = (page) => <Layout title="View Loaner">{page}</Layout>

export default ShowLoanerPage
