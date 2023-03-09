import * as React from 'react';

export default function CTable({ rows }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Homework Name</th>
          <th>Subject</th>
          <th>Due Date</th>
          <th>Due Time</th>
        </tr>
        {rows.map((val, key) => {
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