import { Center } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import React from "react"

function Loading() {
  return (
    <Center minH="350px">
      <Spinner color="brand.500" size="lg" />
    </Center>
  )
}

export default Loading
