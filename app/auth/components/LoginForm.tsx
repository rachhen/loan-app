import { AuthenticationError, useMutation, Link as BlitzLink } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import {
  Box,
  Text,
  Checkbox,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            to enjoy all of our cool <Link color={"brand.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "whiteAlpha.200")}
          boxShadow={"lg"}
          p={8}
        >
          <Form
            submitText="Login"
            schema={Login}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await loginMutation(values)
                props.onSuccess?.()
              } catch (error) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <Stack spacing={4}>
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="example@gmail.com"
                required
              />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="*******"
                type="password"
                required
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme="brand">Remember me</Checkbox>
                  <BlitzLink href="/forgot-password">
                    <Link color={"brand.400"}>Forgot password?</Link>
                  </BlitzLink>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginForm
