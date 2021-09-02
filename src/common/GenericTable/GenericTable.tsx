/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import MaUTable from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useExpanded, useGroupBy, useTable } from "react-table";
import { Theme, withStyles, createStyles } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Statistic } from "../../components/Statistics/statistics.actionTypes";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      "& > .cell, & .cell__expand-btn": {
        display: "flex",
        alignItems: "center",
      },
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

// TODO: improve typings
interface GenericTableProps {
  columns: any;
  data: any;
}

export const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  data,
}) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable<Statistic>(
    {
      columns,
      data,
      initialState: {
        groupBy: ["continent"],
      },
    },
    useGroupBy,
    useExpanded
  );

  return (
    <TableContainer>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <StyledTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTableCell {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <div className="cell">
                          <div className="cell__text">
                            {cell.render("Cell")} ({row.subRows.length})
                          </div>
                          <div
                            className="cell__expand-btn"
                            {...row.getToggleRowExpandedProps()}
                          >
                            {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
                          </div>
                        </div>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : // For cells with repeated values, render null
                      cell.isPlaceholder ? null : (
                        // Otherwise, just render the regular cell
                        cell.render("Cell")
                      )}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};
