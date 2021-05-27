import { BlitzPage, useRouterQuery, Link as BlitzLink, useMutation } from "blitz"
import { Box, Flex, Heading, Stack, Text, Link, useColorModeValue } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <NextSeo title="Set a New Password" />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading as="h1" fontSize={"4xl"}>
            Set a New Password
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "whiteAlpha.200")}
          boxShadow={"lg"}
          p={8}
        >
          {isSuccess ? (
            <Stack spacing={2}>
              <Heading as="h2" size="md">
                Password Reset Successfully
              </Heading>
              <Text>
                Go to the{" "}
                <BlitzLink href="/">
                  <Link color="brand.400">homepage</Link>
                </BlitzLink>
              </Text>
            </Stack>
          ) : (
            <Form
              submitText="Reset Password"
              schema={ResetPassword}
              initialValues={{
                password: "",
                passwordConfirmation: "",
                token: query.token as string,
              }}
              onSubmit={async (values) => {
                try {
                  await resetPasswordMutation({ ...values, token: query.token as string })
                } catch (error) {
                  if (error.name === "ResetPasswordError") {
                    return {
                      [FORM_ERROR]: error.message,
                    }
                  } else {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                    }
                  }
                }
              }}
            >
              <Stack spacing={5}>
                <LabeledTextField name="password" label="New Password" type="password" />
                <LabeledTextField
                  name="passwordConfirmation"
                  label="Confirm New Password"
                  type="password"
                />
              </Stack>
            </Form>
          )}
        </Box>
      </Stack>
    </Flex>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
