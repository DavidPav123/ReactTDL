import * as React from 'react';

export default function CTable({ rows }) {
  let sortedTable = [];

  const sortTable = () => {
    //Run some function to sort the rows and put it into sortedTable
  };

  return (
    <table>
      <tbody>
        <tr>
          <th>Homework Name</th>
          <th>Subject</th>
          <th>Due Date</th>
          <th>Due Time</th>
        </tr>
        {sortedTable.map((val: any, key: any) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.subject}</td>
              <td>{val.dueDate}</td>
              <td>{val.dueTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
