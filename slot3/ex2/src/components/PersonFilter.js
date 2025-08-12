import React, { useState } from 'react';
import { persons } from '../data/person';

const allSkills = Array.from(new Set(persons.flatMap(p => p.skills)));

export default function PersonFilter() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [skill, setSkill] = useState('');

  const filtered = persons.filter(({ age, skills }) =>
    (!min || age >= +min) &&
    (!max || age <= +max) &&
    (!skill || skills.includes(skill))
  );

  return (
    <div className="card shadow-sm border-warning mb-4">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Min age"
              value={min}
              onChange={e => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Max age"
              value={max}
              onChange={e => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={skill}
              onChange={e => setSkill(e.target.value)}
            >
              <option value="">All skills</option>
              {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <ul className="list-group">
          {filtered.length === 0 ? (
            <li className="list-group-item text-danger text-center">
              <span role="img" aria-label="not-found"></span> No found.
            </li>
          ) : (
            filtered.map(({ id, firstName, lastName, skills }) =>
              <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <b>{firstName} – {lastName}</b>
                </span>
                <span>
                  {skills.map(skill => (
                    <span key={skill} className="badge bg-secondary ms-1">{skill}</span>
                  ))}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}