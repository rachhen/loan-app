import { Link as NextLink } from "blitz"
import { IconButton } from "@chakra-ui/button"
import { chakra } from "@chakra-ui/system"
import { Tooltip } from "@chakra-ui/tooltip"
import { LinkBox, LinkOverlay } from "@chakra-ui/layout"
import Icon from "@chakra-ui/icon"
import { NavItemProps } from "./nav-item"

type CollapsedItemProps = NavItemProps & {
  scheme?: string
}

const CollapsedItem = ({
  name,
  scheme,
  active,
  href,
  count,
  icon,
  onClick,
}: CollapsedItemProps) => {
  return (
    <Tooltip hasArrow label={name} placement="right">
      <LinkBox display="flex" justifyContent="center" onClick={onClick}>
        <IconButton
          colorScheme={active ? "brand" : scheme}
          aria-label={name}
          variant={active ? "solid" : "ghost"}
          boxSize="40px"
          alignSelf="center"
          _focus={{ shadow: "none" }}
          icon={
            <>
              <NextLink href={href || ""}>
                <LinkOverlay>
                  <Icon as={icon} fontSize="lg" />
                </LinkOverlay>
              </NextLink>
              {count && (
                <chakra.span
                  pos="absolute"
                  top="-1px"
                  right="-1px"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color="pink.100"
                  transform="translate(50%,-50%)"
                  bg="pink.600"
                  rounded="full"
                >
                  {count}
                </chakra.span>
              )}
            </>
          }
        />
      </LinkBox>
    </Tooltip>
  )
}

export default CollapsedItem
