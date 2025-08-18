import React, { useMemo, useState } from 'react';
import { addMonths, formatDate } from '../utils/date';
import { registrations } from '../data/registrations';

export default function RegistrationTable() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return registrations.map((r) => {
      const expiry = addMonths(r.registrationDate, r.planMonths);
      return {
        ...r,
        expiry,
        expiryFormatted: formatDate(expiry),
        registrationFormatted: formatDate(r.registrationDate),
        firstRegistrationFormatted: formatDate(r.firstRegistration)
      };
    }).filter((r) => r.username.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const downloadCertificate = (row) => {
    const content = [
      '*** Certificate of Registration ***',
      '',
      `Username: ${row.username}`,
      `First Registration: ${row.firstRegistrationFormatted}`,
      `Plan Duration: ${row.planMonths} month(s)`,
      `Registration Date: ${row.registrationFormatted}`,
      `Renewal Date: ${row.renewalFormatted}`,
      '',
    ].join('\n');//1
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-8 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            Registration History
          </h1>
        </header>

        <div className="glass rounded-2xl shadow-soft p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by username..."
                className="w-full rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
              />
            </div>
            <span className="inline-flex items-center text-sm text-gray-500">
              Showing <strong className="mx-1 text-gray-700">{rows.length}</strong> of {registrations.length}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">First Registration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plan Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Renewal Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Certificate</th></tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
