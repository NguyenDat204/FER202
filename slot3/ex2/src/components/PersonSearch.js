import React, { useState } from 'react';
import { persons } from '../data/person';

export default function PersonSearch() {
  const [search, setSearch] = useState('');
  const filtered = persons.filter(p =>
    (p.firstName + ' ' + p.lastName).toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (a.isActive !== b.isActive) return b.isActive - a.isActive;
    if (a.age !== b.age) return a.age - b.age;
    return a.lastName.localeCompare(b.lastName);
  });

  const stats = persons.reduce((acc, p) => {
    acc.total++;
    acc.sumAge += p.age;
    if (p.isActive) acc.active++;
    return acc;
  }, { total: 0, sumAge: 0, active: 0 });

  return (
    <div className="card shadow-sm border-primary mb-4">
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text bg-primary text-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            className="form-control"
            placeholder="Search name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {sorted.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-emoji-frown"></i> No result found!
          </div>
        ) : (
          <ul className="list-group mb-3">
            {sorted.map(p =>
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <b>{p.firstName} {p.lastName}</b>
                  <span className="ms-2 badge bg-light text-dark border border-secondary">{p.age} tuổi</span>
                </span>
                <span className={p.isActive ? 'badge bg-success' : 'badge bg-secondary'}>
                  {p.isActive ? 'Active' : 'Inactive'}
                </span>
              </li>
            )}
          </ul>
        )}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <b>Statistics</b><br />
            <span className="me-3">Total: <b>{stats.total}</b></span>
            <span className="me-3">Avg Age: <b>{(stats.sumAge / stats.total).toFixed(1)}</b></span>
            <span>Active: <b>{stats.active}</b></span>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </div>
    
  );
}