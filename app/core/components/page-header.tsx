import { Link } from "blitz"
import { Flex, Stack, Text } from "@chakra-ui/layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  BreadcrumbSeparator,
  HStack,
} from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { ChevronRightIcon } from "@chakra-ui/icons"

type JustChild = { children: ReactNode }
type PageHeaderProps = {
  Title: typeof Title
  Breadcrumbs: typeof Breadcrumbs
  Description: typeof Description
  Actions: typeof Actions
}
const PageHeader: React.FC & PageHeaderProps = ({ children }: JustChild) => {
  const getChild = (type: string) =>
    React.Children.map(children, (child: any) => child.type.displayName === type && child)

  return (
    <HStack w="full" justifyContent="space-between">
      <Stack>
        {getChild("Title")}
        {getChild("Breadcrumbs")}
      </Stack>
      {getChild("Actions")}
    </HStack>
  )
  // return (
  //   <Flex w="full" direction="column">
  //     {getChild("Title")}
  //     {getChild("Breadcrumbs")}
  //     <Stack direction={{ base: "column", xl: "row" }}>
  //       {getChild("Description")}
  //       {getChild("Actions")}
  //     </Stack>
  //   </Flex>
  // )
}

const Title = ({ children }: JustChild) => {
  return (
    <Text textStyle="default" fontSize="2xl" fontWeight="semibold">
      {children}
    </Text>
  )
}

const Breadcrumbs = ({ children }: JustChild) => {
  const getChild = (type: string) =>
    React.Children.map(children, (child: any) => child.type.displayName === type && child)
  return (
    <Breadcrumb spacing="0px" separator={""} fontSize="smaller">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" as={Link}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {getChild("Item")}
    </Breadcrumb>
  )
}

const Item = ({ href, children }: BreadcrumbItemProps & { href: string }) => {
  return (
    <React.Fragment>
      <BreadcrumbSeparator>
        <ChevronRightIcon color="gray.500" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href={href} as={Link}>
          {children}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </React.Fragment>
  )
}

const Description = ({ children }: JustChild) => {
  return <Text mr="auto">{children}</Text>
}

const Actions = ({ children }: JustChild) => {
  return <Flex ml="auto">{children}</Flex>
}

Item.displayName = "Item"
Breadcrumbs.Item = Item

Title.displayName = "Title"
Breadcrumbs.displayName = "Breadcrumbs"
Description.displayName = "Description"
Actions.displayName = "Actions"

PageHeader.Title = Title
PageHeader.Breadcrumbs = Breadcrumbs
PageHeader.Description = Description
PageHeader.Actions = Actions
export default PageHeader
