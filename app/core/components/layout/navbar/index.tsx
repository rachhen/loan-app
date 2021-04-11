import { Flex, Spacer, Stack, Text } from "@chakra-ui/layout"
import { useRouter } from "blitz"
import { routes } from "app/core/routes"
import NavButton from "./nav-button"
import Actions from "./actions"
import Search from "./search"
import Info from "./info"

const Navbar = () => {
  const router = useRouter()

  const getRoute = () => {
    return routes.find(({ href }) => router.pathname === href)?.name
  }

  return (
    <Flex layerStyle="card" h="4.5rem" roundedBottom={["", "", "2xl"]} alignItems="center" p={5}>
      <Stack direction="row" w="full" alignItems="center" spacing={[0, "", 8]}>
        <Info display={["none", "", "flex"]} />
        <NavButton />

        <Spacer display={{ md: "none" }} />
        <Text
          textStyle="default"
          fontSize="xl"
          fontWeight="semibold"
          fontFamily="cursive"
          display={{ md: "none" }}
        >
          {getRoute()}
        </Text>
        <Search display={["none", "", "initial"]} />
        <Spacer />
        <Actions />
      </Stack>
    </Flex>
  )
}

export default Navbar
