/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EmployeeForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joinDate: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.department.trim()) return "Department is required";
    if (!form.position.trim()) return "Position is required";
    if (!form.salary || Number(form.salary) <= 0)
      return "Salary must be a positive number";
    if (!form.joinDate) return "Join date is required";
    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee/create-employee`,
        form
      );

      if (response.data.success) {
        toast.success("Employee added successfully!");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add employee. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl w-full max-w-lg space-y-4 relative"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Add New Employee
        </h2>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm">
            ⚠️ {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-lg text-sm">
            ✅ Employee added successfully!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Chloe Tan"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. chloe.tan@company.com"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
              <option value="Research">Research</option>
              <option value="IT Support">IT Support</option>
            </select>
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Position</label>
            <input
              type="text"
              name="position"
              placeholder="e.g. Backend Developer"
              value={form.position}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="e.g. 6000"
              value={form.salary}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Join Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Join Date</label>
            <input
              type="date"
              name="joinDate"
              value={form.joinDate}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="resigned">Resigned</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
