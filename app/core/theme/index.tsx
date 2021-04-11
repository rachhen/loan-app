import * as React from "react"
import { extendTheme, ChakraProvider, ChakraProviderProps } from "@chakra-ui/react"
import { overrides } from "./overrides"
import { colors } from "./foundations/colors"
import Fonts from "./foundations/fonts"
import AppProgress from "../components/AppProgress"

const theme = extendTheme(overrides)

export default function Theme({ children }: ChakraProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <AppProgress
        color={colors.brand[400]}
        startPosition={0.3}
        stopDelayMs={200}
        height={1}
        options={{ showSpinner: false }}
      />
      {children}
    </ChakraProvider>
  )
}
