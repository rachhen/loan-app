import { useContext } from "react"
import { useMutation, useRouter } from "blitz"
import { Divider, Spacer, Stack } from "@chakra-ui/layout"
import { FiPlus, FiPower, FiSettings } from "react-icons/fi"
import { integrations, routes } from "app/core/routes"
import { NavContext } from "../index"
import logout from "app/auth/mutations/logout"
import NavItem from "./nav-item"
import SectionDivider from "./section-divider"
import IntegrationItem from "./integration-item"
import CollapsedItem from "./collapsed-item"

const Sidebar = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const { isOpen } = useContext(NavContext)
  const NavAction = isOpen ? CollapsedItem : NavItem
  const IntegrationAction = isOpen ? CollapsedItem : IntegrationItem
  const currentRoute = router.route.split("/").filter((r) => r !== "")

  return (
    <Stack
      layerStyle="card"
      rounded="xl"
      w={isOpen ? "60px" : "300px"}
      transition="width .4s ease-in-out"
      py={8}
      shadow="md"
      minH="full"
      spacing={2}
      fontSize="sm"
      display={["none", "", "initial"]}
      overflowX={isOpen ? "initial" : "clip"}
    >
      {routes.map((props, rid) => (
        <NavAction
          key={`nav-item-${rid}`}
          active={
            router.route === "/" && props.href === "/"
              ? true
              : currentRoute.includes(props.href.replace("/", ""))
          }
          {...props}
        />
      ))}
      {isOpen ? <Divider /> : <SectionDivider>Integrations</SectionDivider>}
      {integrations.map((props, iid) => (
        <IntegrationAction key={`int-item-${iid}`} {...props} />
      ))}
      <IntegrationAction name="Add new plugin" icon={FiPlus} scheme="purple" />
      <Spacer />
      <Divider display={{ md: "none" }} />
      <NavAction name="Settings" icon={FiSettings} />
      <NavAction
        name="Logout"
        icon={FiPower}
        onClick={async () => {
          await logoutMutation()
          router.push("/login")
        }}
      />
    </Stack>
  )
}

export default Sidebar
