import { Box, BoxProps } from "@chakra-ui/layout"

const SectionDivider = (props: BoxProps) => {
  return <Box textTransform="uppercase" px={8} pt={4} {...props} />
}

export default SectionDivider
