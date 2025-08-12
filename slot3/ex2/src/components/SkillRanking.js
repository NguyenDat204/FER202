import React from 'react';
import { persons } from '../data/person';

export default function SkillRanking() {
  const skillCount = persons.reduce((acc, { skills }) => {
    skills.forEach(skill => acc[skill] = (acc[skill] || 0) + 1);
    return acc;
  }, {});
  const sorted = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topCount = sorted[0]?.[1];

  return (
    <div className="card shadow-sm border-info mb-4">
      <div className="card-body">
        <table className="table table-bordered table-hover table-striped w-auto mb-0">
          <thead className="table-info">
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(([skill, count]) =>
              <tr key={skill}>
                <td>{skill}</td>
                <td className={count === topCount ? 'fw-bold text-primary' : ''}>
                  {count} {count === topCount ? <span role="img" aria-label="top"></span> : ''}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}