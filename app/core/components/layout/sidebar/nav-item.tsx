import Icon from "@chakra-ui/icon"
import { BoxProps, LinkBox, LinkOverlay, Spacer, Stack, Text } from "@chakra-ui/layout"
import { chakra, useColorModeValue as mode } from "@chakra-ui/system"
import { IconType } from "react-icons"
import { Link as NextLink } from "blitz"

export type NavItemProps = {
  icon: IconType
  active?: boolean
  count?: number
  href?: string
  name: string
}

const NavItem = ({ name, active, href, count, icon }: NavItemProps) => {
  const activeColor = mode("brand.600", "white")
  const activeProps: BoxProps = {
    color: activeColor,
    borderRightColor: active ? activeColor : "",
    bg: "blackAlpha.300",
  }

  return (
    <LinkBox>
      <Stack
        direction="row"
        cursor="pointer"
        px={8}
        py={4}
        spacing={4}
        alignItems="center"
        fontWeight="semibold"
        transition="all .4s ease-in-out"
        borderRightWidth="3px"
        borderRightColor="transparent"
        _hover={activeProps}
        {...(active && activeProps)}
      >
        <Icon as={icon} fontSize="xl" />
        <NextLink href={href || ""}>
          <LinkOverlay>
            <Text>{name}</Text>
          </LinkOverlay>
        </NextLink>
        <Spacer />
        {count && (
          <chakra.span
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="pink.50"
            bg="pink.500"
            rounded="full"
          >
            {count}
          </chakra.span>
        )}
      </Stack>
    </LinkBox>
  )
}

export default NavItem
