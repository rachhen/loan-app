import { useRouter, BlitzPage } from "blitz"
import { NextSeo } from "next-seo"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <NextSeo title="Sign Up" />
      <SignupForm onSuccess={() => router.push("/")} />
    </>
  )
}

SignupPage.redirectAuthenticatedTo = "/"

export default SignupPage
