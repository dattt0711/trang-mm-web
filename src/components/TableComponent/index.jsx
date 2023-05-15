import React from 'react'
import styled from 'styled-components'
import styles from './styles.module.css';

import { useTable, useRowSelect } from 'react-table'




const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function TableComponent({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        // {
        // id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        // Header: ({ getToggleAllRowsSelectedProps }) => (
        //   <div>
        //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        //   </div>
        // ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        // Cell: ({ row }) => (
        //   <div>
        //     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //   </div>
        // ),
        // },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}
                    style={{ color: cell.column.colorText }}
                  >
                    {cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table >
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  )
}


export default TableComponent;
