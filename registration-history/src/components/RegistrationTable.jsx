import React, { useMemo, useState } from 'react';
import { addMonths, formatDate } from '../utils/date';
import { registrations } from '../data/registrations';

export default function RegistrationTable() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return registrations
      .map((r) => {
        const expiry = addMonths(r.registrationDate, r.planMonths);

        const registrationDate = new Date(r.registrationDate);
        const year =
          registrationDate.getMonth() >= 3
            ? registrationDate.getFullYear()
            : registrationDate.getFullYear() - 1;
        const academicYearEnd = new Date(year + 1, 2, 31);

        const monthsLeft =
          (academicYearEnd.getFullYear() - registrationDate.getFullYear()) * 12 +
          (academicYearEnd.getMonth() - registrationDate.getMonth()) +
          1;

        const monthlyRate = 12000 / 12;
        const payment = Math.round(monthsLeft * monthlyRate);

        return {
          ...r,
          expiry,
          expiryFormatted: formatDate(expiry),
          registrationFormatted: formatDate(r.registrationDate),
          firstRegistrationFormatted: formatDate(r.firstRegistration),
          location: 'Pimpri',
          payment,
          paymentReceipt: `Receipt-${r.username}-${Date.now()}`,
        };
      })
      .filter((r) => r.username.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const downloadCertificate = (row) => {
    const content = [
      '*** Certificate of Registration ***',
      '',
      `Username: ${row.username}`,
      `First Registration: ${row.firstRegistrationFormatted}`,
      `Plan Duration: ${row.planMonths} month(s)`,
      `Registration Date: ${row.registrationFormatted}`,
      `Renewal Date: ${row.expiryFormatted}`,
      `Location: ${row.location}`,
      `Payment: ₹${row.payment}`,
      `Receipt: ${row.paymentReceipt}`,
      '',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${row.username}_certificate.txt`;
    link.click();
  };

  const downloadReceipt = (row) => {
    const content = [
      '*** Payment Receipt ***',
      '',
      `Username: ${row.username}`,
      `Receipt No: ${row.paymentReceipt}`,
      `Payment Amount: ₹${row.payment}`,
      `Registration Date: ${row.registrationFormatted}`,
      '',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${row.username}_receipt.txt`;
    link.click();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-8 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            Registration History
          </h1>
        </header>

        <div className="glass rounded-2xl shadow-soft p-4 sm:p-6 border border-gray-100">

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Reg.ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">First Registration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plan Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Renewal Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Payment Receipt</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">Certificate</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      {idx + 1001}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {row.firstRegistrationFormatted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700">
                        {row.planMonths} month{row.planMonths > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {row.registrationFormatted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                        {row.expiryFormatted}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                      {row.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-indigo-700">
                      ₹{row.payment}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => downloadReceipt(row)}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-gray-300 active:scale-[.98] transition"
                      >
                        Receipt
                      </button>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => downloadCertificate(row)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md active:scale-[.99] transition"
                      >
                        Download
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
