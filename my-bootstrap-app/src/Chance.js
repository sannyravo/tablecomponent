import React from 'react';
import Chance from 'chance';

const chance = new Chance();

function TableComponent() {
  // Generate random data
  const rows = Array.from({ length: 5 }).map(() => ({
    id: chance.guid(),
    name: chance.name(),
    age: chance.age(),
    country: chance.country({ full: true }),
  }));

  return (
    <table className="table table-striped text-light">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Country</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id}>
            <th scope="row">{index + 1}</th>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
