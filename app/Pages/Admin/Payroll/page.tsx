'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPayrolls = async () => {
    try {
      // Sử dụng đúng URL endpoint
      const response = await axios.get('/Api/Payroll'); 
      setPayrolls(response.data.data);
    } catch (err: any) {
      setError('Error fetching payroll records');
      console.error('Error fetching payroll records:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Payroll Management</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-gray-800 rounded-lg shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Employee ID</th>
                <th className="py-3 px-4 text-left">Salary</th>
                <th className="py-3 px-4 text-left">Bonus</th>
                <th className="py-3 px-4 text-left">Deductions</th>
                <th className="py-3 px-4 text-left">Total Pay</th>
                <th className="py-3 px-4 text-left">Payment Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((payroll: any) => (
                <tr key={payroll._id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4">{payroll.employeeId}</td>
                  <td className="py-3 px-4">${payroll.salary}</td>
                  <td className="py-3 px-4">${payroll.bonus}</td>
                  <td className="py-3 px-4">${payroll.deductions}</td>
                  <td className="py-3 px-4">${payroll.totalPay}</td>
                  <td className="py-3 px-4">{new Date(payroll.paymentDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-white ${payroll.status === 'pending' ? 'bg-yellow-500' : payroll.status === 'paid' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {payroll.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPayrollPage;
