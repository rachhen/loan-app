import { BlitzPage, useMutation } from "blitz"
import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import React from "react"
import { NextSeo } from "next-seo"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <NextSeo title="Forgot password" description="Send Reset Password" />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Forgot your password?</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "whiteAlpha.200")}
          boxShadow={"lg"}
          p={8}
        >
          {isSuccess ? (
            <Box>
              <Heading as="h2" size="md">
                Request Submitted
              </Heading>
              <Text pt="2">
                If your email is in our system, you will receive instructions to reset your password
                shortly.
              </Text>
            </Box>
          ) : (
            <Form
              submitText="Send Reset Password Instructions"
              schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error) {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }}
            >
              <Stack spacing={5}>
                <LabeledTextField name="email" label="Email" placeholder="example@gmail.com" />
              </Stack>
            </Form>
          )}
        </Box>
      </Stack>
    </Flex>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"

export default ForgotPasswordPage
