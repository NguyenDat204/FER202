import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('asc');
  const [filtered, setFiltered] = useState(companies);

  const categories = ['All', ...Array.from(new Set(companies.map(c => c.category)))];

  const handleSearch = () => {
    let result = companies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'All') {
      result = result.filter(c => c.category === category);
    }
    if (sort === 'asc') {
      result.sort((a, b) => a.start - b.start);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.start - a.start);
    } else if (sort === 'range') {
      result.sort((a, b) => (a.end - a.start) - (b.end - b.start));
    }
    setFiltered(result);
  };

  React.useEffect(() => {
    handleSearch();
  }, [category, sort]);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">Company List</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="input-group">
            <span className="input-group-text bg-gradient" style={{ background: '#6366f1', color: '#fff' }}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
        </div>
        <div className="col-md-3 mb-2">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-tags-fill"></i>
            </span>
            <select
              className="form-select border-primary"
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ fontWeight: 500, background: "#f8fafc" }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="input-group">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-sort-down-alt"></i>
            </span>
            <select
              className="form-select border-success"
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{ fontWeight: 500, background: "#f8fafc" }}
            >
              <option value="asc">Năm tăng dần</option>
              <option value="desc">Năm giảm dần</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No result</td>
              </tr>
            ) : (
              filtered.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.category}</td>
                  <td>{c.start}</td>
                  <td>{c.end}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Bootstrap Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </div>
  );
}

export default App;
