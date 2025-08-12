import React, { useState } from 'react';
import { persons } from '../data/person';

export default function PersonList() {
  const [sortOrder, setSortOrder] = useState('asc');
  const sorted = [...persons].sort((a, b) =>
    sortOrder === 'asc'
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName)
  );

  return (
    <div className="card shadow-sm border-success mb-4">
      <div className="card-body">
        <button
          className="btn btn-success mb-3"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <span role="img" aria-label="sort"></span> Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
        <ul className="list-group">
          {sorted.map(p => (
            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <b>{p.firstName} {p.lastName}</b>
                <span className="ms-2 badge bg-light text-dark border border-secondary">{p.age} tuổi</span>
                <span className="ms-2 badge bg-secondary">{p.city}</span>
              </div>
              <span>
                {p.skills.map(skill => (
                  <span key={skill} className="badge bg-info text-dark ms-1">{skill}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}