import { useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLoaner from "app/loaners/mutations/createLoaner"
import { Stack, Box } from "@chakra-ui/react"
import { LoanerForm, FORM_ERROR } from "app/loaners/components/LoanerForm"
import PageHeader from "app/core/components/page-header"
import React from "react"
import { CreateLoaner } from "app/loaners/validations"

const NewLoanerPage: BlitzPage = () => {
  const router = useRouter()
  const [createLoanerMutation] = useMutation(createLoaner)

  return (
    <React.Fragment>
      <Stack spacing={4}>
        <PageHeader>
          <PageHeader.Title>Create Loaner</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Breadcrumbs.Item href="/loaners">Loaners</PageHeader.Breadcrumbs.Item>
            <PageHeader.Breadcrumbs.Item href="#">New</PageHeader.Breadcrumbs.Item>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <Box layerStyle="card" boxShadow="base" rounded="2xl" p="5">
          <LoanerForm
            submitText="Create Loaner"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateLoaner}
            initialValues={{ status: true }}
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
                const loaner = await createLoanerMutation(values)
                router.push(`/loaners/${loaner.id}`)
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

NewLoanerPage.authenticate = true
NewLoanerPage.getLayout = (page) => <Layout title={"Create Loaner"}>{page}</Layout>

export default NewLoanerPage
