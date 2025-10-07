"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import EmployeeActions from "../EmployeeActions/EmployeeActions";

interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: string;
}

function getVisiblePages(current: number, total: number): (number | string)[] {
  const pages: (number | string)[] = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else if (current <= 3) {
    pages.push(1, 2, 3, "...", total);
  } else if (current >= total - 2) {
    pages.push(1, "...", total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }
  return pages;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  // Fetch employees with filters
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (name) params.append("name", name);
      if (email) params.append("email", email);
      if (minSalary) params.append("minSalary", minSalary);
      if (maxSalary) params.append("maxSalary", maxSalary);
      if (department) params.append("department", department);
      if (position) params.append("position", position);
      if (status) params.append("status", status);
      if (joinDate) params.append("joinDate", joinDate);

      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee?${params.toString()}`
      );

      if (res.data.success) {
        setEmployees(res.data.data.result);
        setTotalPage(res.data.data.total.totalPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchEmployees();
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMinSalary("");
    setMaxSalary("");
    setDepartment("");
    setPosition("");
    setStatus("");
    setPage(1);
    setLimit(10);
    setJoinDate("");
    handleSearch();
  };

  return (
    <div className="space-y-6">
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Filter Section */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                🔍 Employee Filters
              </h2>

              {/* Filter Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Search by Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Search by Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. chloe.tan@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>

                {/* Min Salary */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4000"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>

                {/* Max Salary */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 9000"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>

                {/* Join Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>

                {/* Department */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="IT Support">IT Support</option>
                  </select>
                </div>

                {/* Position */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  >
                    <option value="">All Positions</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Sales Executive">Sales Executive</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="resigned">Resigned</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleSearch}
                  className="bg-green-700 cursor-pointer hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* 🧾 Table Section */}
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="min-w-full border-collapse">
                <thead className="bg-green-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Department</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Salary</th>
                    <th className="px-4 py-2 text-left">Join Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{emp.name}</td>
                      <td className="px-4 py-2">{emp.email}</td>
                      <td className="px-4 py-2">{emp.department}</td>
                      <td className="px-4 py-2">{emp.position}</td>
                      <td className="px-4 py-2">
                        RM {emp.salary.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{emp.joinDate}</td>
                      <td
                        className={`px-4 py-2 font-medium ${
                          emp.status === "active"
                            ? "text-green-600"
                            : emp.status === "on-leave"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {emp.status}
                      </td>
                      <td className="px-4 py-2 text-right space-x-2">
                        {/* <button className="text-blue-600 cursor-pointer hover:underline">
                          Edit
                        </button>
                        <button className="text-red-600 cursor-pointer hover:underline">
                          Delete
                        </button> */}
                        <EmployeeActions employee={emp} onRefresh={fetchEmployees} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {employees.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  No employees found.
                </p>
              )}
            </div>

            {/* 📄 Pagination */}
            <div className="md:flex justify-between items-center pt-4">
              <p className="text-sm pb-5 md:pb-0 text-gray-600">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPage}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    page === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer "
                  }`}
                >
                  Prev
                </button>

                {getVisiblePages(page, totalPage).map((p, i) =>
                  p === "..." ? (
                    <span key={i} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setPage(p as number)}
                      className={`px-3 cursor-pointer py-1 rounded-lg border text-sm ${
                        page === p
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  disabled={page === totalPage}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPage))
                  }
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    page === totalPage
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer "
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
