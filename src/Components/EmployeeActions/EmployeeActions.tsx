"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

export default function EmployeeActions({
  employee,
  onRefresh,
}: {
  employee: Employee;
  onRefresh: () => void;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState<Employee>(employee);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee/delete-employee/${employee._id}`
      );
      setShowDeleteModal(false);
      toast.success("Employee deleted successfully!");
      onRefresh();
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Edit (Update)
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee/update-employee/${employee._id}`,
        form
      );
      setShowEditModal(false);
      toast.success("Employee updated successfully!");
      onRefresh();
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    } as Employee);
  };

  return (
    <td className="px-4 py-2 text-right space-x-2">
      {/* Edit Button */}
      <button
        onClick={() => setShowEditModal(true)}
        className="text-blue-600 cursor-pointer hover:underline"
      >
        Edit
      </button>

      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteModal(true)}
        className="text-red-600 cursor-pointer hover:underline"
      >
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this employee?
            </h2>
            <p className="text-gray-600 mb-6">{employee.name}</p>
            <div className="flex justify-center gap-4">
              <button
                disabled={loading}
                onClick={handleDelete}
                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <form
            onSubmit={handleEdit}
            className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Position"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="salary"
                type="number"
                value={form.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="joinDate"
                type="date"
                value={form.joinDate.split("T")[0]}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 col-span-2"
              >
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="resigned">Resigned</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border cursor-pointer rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </td>
  );
}
