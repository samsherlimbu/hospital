import React, { useEffect, useState } from 'react';
import AddDepartment from '../adddepartment/page';
import axios from 'axios';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}departmentlist`);
      setDepartments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <div>
      <AddDepartment />

      <div>
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-400">
            <tr>
              <th className="py-2 px-4 border-b">Department Name <span>↑↓</span></th>
            </tr>
          </thead>
          <tbody className="bg-slate-300 gap-2 ">
            {departments.map((department) => (
              <tr key={department._id} className="border-b flex items-center justify-center font-semibold">
                <td className="py-2 px-4 ">{department.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;
