import { Center, Spinner } from "@chakra-ui/react"

export function PageLoading() {
  return (
    <Center h="100vh" width="100vw">
      <Spinner thickness="5px" speed="0.65s" emptyColor="red.100" color="red.500" size="xl" />
    </Center>
  )
}
