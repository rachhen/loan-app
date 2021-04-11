import { BoxProps } from "@chakra-ui/react"
import { mode } from "./tl-mode"

type TextStyles = { [key: string]: BoxProps | any }
export const textStyles: TextStyles = {
  stroke: {
    color: "transparent",
    WebkitTextStrokeColor: "white",
    WebkitTextStrokeWidth: "1px",
  },
  default: {
    ...mode("color", "black", "white"),
  },
  light: {
    ...mode("color", "gray.600", "gray.400"),
  },
}
