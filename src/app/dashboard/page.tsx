'use client';
import EmployeeForm from "@/Components/EmployeeForm/EmployeeForm";
import EmployeeTable from "@/Components/EmployeeTable/EmployeeTable";
import { useState } from "react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </header>

      <EmployeeTable />

      {showForm && <EmployeeForm onClose={() => setShowForm(false)} />}
    </section>
  );
}
