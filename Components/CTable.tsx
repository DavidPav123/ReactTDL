import * as React from 'react';
import '../CTable.css';

const sortTable = (
  table: [{ name: string; subject: string; dueDate: string; dueTime: string }]
) => {
  console.log('Sort Table Called');
  let switching = true;
  let shouldSwitch: boolean = false;
  let i: number;
  let dueDate1: number = 0;
  let dueDate2: number = 0;

  while (switching) {
    switching = false;
    for (i = 0; i < table.length - 1; i++) {
      shouldSwitch = false;
      const dueTimeArray1 = table[i].dueTime.split(':');
      const dueTimeArray2 = table[i + 1].dueTime.split(':');
      const dueTime1 =
        parseInt(dueTimeArray1[0]) * 3600000 +
        parseInt(dueTimeArray1[1]) * 60000;
      const dueTime2 =
        parseInt(dueTimeArray2[0]) * 3600000 +
        parseInt(dueTimeArray2[1]) * 60000;
      if (!Number.isNaN(dueTime1) && !Number.isNaN(dueTime2)) {
        dueDate1 = new Date(table[i].dueDate).getTime() + 36000000 + dueTime1;
        dueDate2 =
          new Date(table[i + 1].dueDate).getTime() + 36000000 + dueTime2;
      } else {
        dueDate1 = new Date(table[i].dueDate).getTime() + 36000000;
        dueDate2 = new Date(table[i + 1].dueDate).getTime() + 36000000;
      }
      if (dueDate2 < dueDate1) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      [table[i], table[i + 1]] = [table[i + 1], table[i]];
      console.log('Swapped ' + table[i].name + ' and ' + table[i + 1].name);
      switching = true;
    }
  }
  return table;
};

function highlightRow(dueDate, dueTime) {
  const currentTime = new Date().getTime();
  const dueTimeArray = dueTime.split(':');
  const dueTimeInMilliseconds =
    parseInt(dueTimeArray[0]) * 3600000 + parseInt(dueTimeArray[1]) * 60000;
  const dueDateTime = new Date(dueDate).getTime() + 36000000 + dueTimeInMilliseconds;

  const diff = dueDateTime - currentTime;

  if (diff < 0) {
    return 'highlight-red';
  } else if (diff <= 86400000) {
    return 'highlight-yellow';
  } else {
    return 'highlight-green';
  }
}

export default function CTable({ rows }) {
  let sortedTable = sortTable(rows);

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
          const rowClass = highlightRow(val.dueDate, val.dueTime);
          return (
            <tr key={key} className={rowClass}>
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