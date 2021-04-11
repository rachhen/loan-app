import { Flex, Stack, Text } from "@chakra-ui/layout"
import React, { ReactNode } from "react"

type JustChild = { children: ReactNode }
type PageHeaderProps = {
  Title: typeof Title
  Description: typeof Description
  Actions: typeof Actions
}
const PageHeader: React.FC & PageHeaderProps = ({ children }: JustChild) => {
  const getChild = (type: string) =>
    React.Children.map(children, (child: any) => child.type.name === type && child)

  return (
    <Flex w="full" direction="column">
      {getChild("Title")}
      <Stack direction={{ base: "column", xl: "row" }}>
        {getChild("Description")}
        {getChild("Actions")}
      </Stack>
    </Flex>
  )
}

const Title = ({ children }: JustChild) => {
  return (
    <Text textStyle="default" fontSize="2xl" fontWeight="semibold">
      {children}
    </Text>
  )
}

const Description = ({ children }: JustChild) => {
  return <Text mr="auto">{children}</Text>
}

const Actions = ({ children }: JustChild) => {
  return <Flex ml="auto">{children}</Flex>
}

Title.name = "Title"
Description.name = "Description"
Actions.name = "Actions"

PageHeader.Title = Title
PageHeader.Description = Description
PageHeader.Actions = Actions
export default PageHeader
