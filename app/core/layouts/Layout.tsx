import { ReactNode } from "react"
import { Box, Stack } from "@chakra-ui/layout"
import { useDisclosure } from "@chakra-ui/hooks"
import { useMediaQuery } from "@chakra-ui/media-query"
import { NextSeo } from "next-seo"
import { NavContext } from "../components/layout"
import Navbar from "../components/layout/navbar"
import Page from "../components/layout/page"
import Sidebar from "../components/layout/sidebar"
import Scroll from "../components/layout/scroll"
import MobileSidebar from "../components/layout/sidebar/mobile"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const sidebarState = useDisclosure()
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)")

  return (
    <Scroll>
      <NextSeo title={title} />
      <NavContext.Provider value={sidebarState}>
        <Box textStyle="light">
          <Navbar />
          <Box pos="relative" h="max-content" m={[2, "", 5]}>
            <Stack direction="row" spacing={{ md: 5 }}>
              <Sidebar />
              {isSmallScreen && <MobileSidebar />}
              <Page>{children}</Page>
            </Stack>
          </Box>
        </Box>
      </NavContext.Provider>
    </Scroll>
  )
}

export default Layout
