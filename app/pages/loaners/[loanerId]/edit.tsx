import React, { Suspense } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLoaner from "app/loaners/queries/getLoaner"
import updateLoaner from "app/loaners/mutations/updateLoaner"
import { LoanerForm, FORM_ERROR } from "app/loaners/components/LoanerForm"
import { UpdateLoaner } from "app/loaners/validations"
import PageHeader from "app/core/components/page-header"
import { Box, Stack } from "@chakra-ui/react"

export const EditLoaner = () => {
  const router = useRouter()
  const loanerId = useParam("loanerId", "number")
  const [loaner, { setQueryData }] = useQuery(getLoaner, { id: loanerId })
  const [updateLoanerMutation] = useMutation(updateLoaner)

  return (
    <Stack spacing={4}>
      <PageHeader>
        <PageHeader.Title>Update Loaner</PageHeader.Title>
        <PageHeader.Breadcrumbs>
          <PageHeader.Breadcrumbs.Item href="/loaners">Loaners</PageHeader.Breadcrumbs.Item>
          <PageHeader.Breadcrumbs.Item href="#">Edit</PageHeader.Breadcrumbs.Item>
        </PageHeader.Breadcrumbs>
      </PageHeader>

      <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
        <LoanerForm
          submitText="Update Loaner"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateLoaner}
          initialValues={loaner}
          onSubmit={async (values) => {
            try {
              if (values.files) {
                const formData = new FormData()
                formData.append("file", values.files[0])
                formData.append("upload_preset", "loan-app")
                const endpoint = "https://api.cloudinary.com/v1_1/woufu/upload"
                const image = await fetch(endpoint, {
                  method: "POST",
                  body: formData,
                }).then((res) => res.json())

                values.photo = image
                delete values.files
              }
              values.id = loaner.id
              const updated = await updateLoanerMutation(values)
              await setQueryData(updated)
              router.push(`/loaners/${updated.id}`)
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
  )
}

const EditLoanerPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditLoaner />
    </Suspense>
  )
}

EditLoanerPage.authenticate = true
EditLoanerPage.getLayout = (page) => <Layout title="Update Product">{page}</Layout>

export default EditLoanerPage
