import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import { DefaultSeo } from "next-seo"
import LoginForm from "app/auth/components/LoginForm"
import AppTemplete from "app/core/theme"

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <AppTemplete>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={() => {
          // This ensures the Blitz useQuery hooks will automatically refetch
          // data any time you reset the error boundary
          queryCache.resetErrorBoundaries()
        }}
      >
        <DefaultSeo
          titleTemplate="%s"
          defaultTitle="Loan System"
          description="Loan System is the system for loan"
          canonical=""
          openGraph={{
            url: "",
            site_name: "Loan System",
            title: "Loan System",
            description: "Loan System is the system for loan",
            type: "website",
            locale: "en_IE",
            images: [
              {
                url: "/og-image-01.jpg",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
              },
            ],
          }}
          additionalLinkTags={[
            {
              rel: "icon",
              href: "/logo.png",
            },
            {
              rel: "apple-touch-icon",
              href: "/apple-touch-icon.png",
              sizes: "76x76",
            },
          ]}
        />
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </AppTemplete>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
