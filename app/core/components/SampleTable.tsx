import React from "react"
import { Table, Thead, Tr, Th, Tbody, Td, TableProps } from "@chakra-ui/table"
import { useTable, TableOptions } from "react-table"

interface SampleTableProps<D extends object = {}> extends TableOptions<D> {
  table?: TableProps
}

export const SampleTable = ({ table, ...props }: SampleTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(props)

  return (
    <Table {...getTableProps()} variant="simple" {...table}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
