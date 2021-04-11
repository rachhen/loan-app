import { useRouter, BlitzPage } from "blitz"
import { NextSeo } from "next-seo"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <NextSeo title="Sign Up" />
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </>
  )
}

LoginPage.redirectAuthenticatedTo = "/"

export default LoginPage
