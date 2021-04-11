import { Flex, Stack, StackProps, Text } from "@chakra-ui/layout"
import Logo from "app/core/components/logo"

const Info = (props: StackProps) => {
  return (
    <Stack direction="row" alignItems="center" {...props}>
      <Logo />
      <Flex direction="column" lineHeight="5">
        <Text fontSize="lg" fontWeight="semibold" textStyle="default">
          Loan System
        </Text>
        <Text fontSize="sm">woufu@aol.com</Text>
      </Flex>
    </Stack>
  )
}

export default Info
