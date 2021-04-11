import { Box } from "@chakra-ui/layout"
import { ReactNode } from "react"

const Page = ({ children }: { children: ReactNode }) => {
  return <Box w="full">{children}</Box>
}

export default Page
