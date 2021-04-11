import { UseDisclosureReturn } from "@chakra-ui/react"
import { createContext } from "react"

export const NavContext = createContext<Partial<UseDisclosureReturn>>({})
