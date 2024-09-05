import React, { useState, useEffect, useRef } from 'react';
import Chance from 'chance';
import * as XLSX from 'xlsx';
import './TableComponent.css'; // Ensure you have the CSS file

const chance = new Chance();

function TableComponent() {
  const [rows] = useState(
    Array.from({ length: 50 }).map(() => ({
      id: chance.guid(),
      name: chance.name(),
      age: chance.age(),
      country: chance.country({ full: true }),
      accountNo: chance.integer({ min: 10000000, max: 99999999 }), // Random 8-digit account number
      email: chance.email(),
      accountType: chance.pickone(['Basic', 'Premium', 'Enterprise']),
      package: chance.pickone(['Standard', 'Advanced', 'Pro']),
      packagePrice: chance.dollar({ min: 10, max: 1000 }),
      regTime: chance.date({ year: 2024 }).toLocaleTimeString(),
      address: chance.address(),
      phoneNumber: chance.phone(),
      membershipDate: chance.date({ year: 2023 }).toLocaleDateString()
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterConfig, setFilterConfig] = useState({
    name: '',
    accountNo: '',
    email: '',
    accountType: '',
    package: '',
    packagePrice: '',
    regTime: '',
    address: '',
    phoneNumber: '',
    membershipDate: ''
  });
  const [dropdownVisible, setDropdownVisible] = useState({
    name: false,
    accountNo: false,
    email: false,
    accountType: false,
    package: false,
    packagePrice: false,
    regTime: false,
    address: false,
    phoneNumber: false,
    membershipDate: false
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible({
          name: false,
          accountNo: false,
          email: false,
          accountType: false,
          package: false,
          packagePrice: false,
          regTime: false,
          address: false,
          phoneNumber: false,
          membershipDate: false
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rowsPerPage = 10;

  // Extract unique values for dropdown filters
  const getUniqueValues = (column) => {
    const values = [...new Set(rows.map(row => row[column]))];
    return values;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e, column) => {
    setFilterConfig({ ...filterConfig, [column]: e.target.value });
  };

  const clearFilter = (column) => {
    setFilterConfig({ ...filterConfig, [column]: '' });
  };

  const toggleDropdown = (column) => {
    setDropdownVisible({
      ...dropdownVisible,
      [column]: !dropdownVisible[column]
    });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredRows = sortedRows.filter((row) =>
    Object.keys(filterConfig).every(column =>
      row[column]?.toString().toLowerCase().includes(filterConfig[column].toLowerCase())
    ) &&
    (row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = Object.keys(rows[0]);
    csvRows.push(headers.join(','));
    filteredRows.forEach(row => {
      csvRows.push(headers.map(header => JSON.stringify(row[header], (_, value) => value ?? '')).join(','));
    });
    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    link.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="text-light">Random Data Table</h2>
        <div>
          <button className="btn btn-primary mx-3" onClick={exportToCSV}>
            <i className="fas fa-file-csv"></i>
          </button>
          <button className="btn btn-primary" onClick={exportToExcel}>
            <i className="fas fa-file-excel"></i>
          </button>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or country"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="table-wrapper">
        <div className="table-container">
          <table className="table table-bordered table-light table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th scope="col">SL</th>
                {['name', 'accountNo', 'email', 'accountType', 'package', 'packagePrice', 'regTime', 'address', 'phoneNumber', 'membershipDate'].map((column) => (
                  <th key={column} scope="col" className={`table-header ${filterConfig[column] ? 'filtered' : ''}`}>
                    {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                    <div className="header-actions">
                      <button
                        className="btn filter-btn"
                        onClick={() => handleSort(column)}
                      >
                        {sortConfig.key === column ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▼'}
                      </button>
                      <button
                        className="btn filter-btn"
                        onClick={() => toggleDropdown(column)}
                      >
                        {dropdownVisible[column] ? '▲' : '▼'}
                      </button>
                      {dropdownVisible[column] && (
                        <div className="dropdown-menu" ref={dropdownRef}>
                          <select
                            value={filterConfig[column]}
                            onChange={(e) => handleFilterChange(e, column)}
                          >
                            <option value="">Select {column}</option>
                            {getUniqueValues(column).map(value => (
                              <option key={value} value={value}>{value}</option>
                            ))}
                          </select>
                          <button className="btn btn-secondary btn-sm mt-2" onClick={() => clearFilter(column)}>Clear Filter</button>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                <th scope="col" style={{ position: 'sticky', right: 0, backgroundColor: '#f8f9fa', zIndex: 10 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={row.id}>
                  <th scope="row">{indexOfFirstRow + index + 1}</th>
                  <td>{row.name}</td>
                  <td>{row.accountNo}</td>
                  <td>{row.email}</td>
                  <td>{row.accountType}</td>
                  <td>{row.package}</td>
                  <td>{row.packagePrice}</td>
                  <td>{row.regTime}</td>
                  <td>{row.address}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.membershipDate}</td>
                  <td style={{ position: 'sticky', right: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                    <button className="btn btn-info btn-sm mx-1">Edit</button>
                    <button className="btn btn-danger btn-sm mx-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          &laquo; Previous
        </button>
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn btn-secondary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default TableComponent;
