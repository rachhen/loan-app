import { Suspense } from "react"
import { NextSeo } from "next-seo"
import { ErrorComponent } from "@blitzjs/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Center, Spinner } from "@chakra-ui/react"
import PageHeader from "app/core/components/page-header"
import Layout from "app/core/layouts/Layout"

function Render404() {
  const currentUser = useCurrentUser()
  const statusCode = 404
  const title = "This page could not be found"

  if (currentUser) {
    return (
      <Layout>
        <NextSeo title={`${statusCode}: ${title}`} />
        <PageHeader>
          <PageHeader.Title>{statusCode}</PageHeader.Title>
          <PageHeader.Description>{`${statusCode}: ${title}`}</PageHeader.Description>
        </PageHeader>
      </Layout>
    )
  }

  return (
    <>
      <NextSeo title={`${statusCode}: ${title}`} />
      <ErrorComponent title={title} statusCode={statusCode} />
    </>
  )
}

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
function Page404() {
  return (
    <Suspense
      fallback={
        <Center minH="100vh">
          <Spinner size="xl" color="brand.400" />
        </Center>
      }
    >
      <Render404 />
    </Suspense>
  )
}

export default Page404
