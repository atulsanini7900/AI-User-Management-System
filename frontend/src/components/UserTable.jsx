import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              AI Bio
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user._id} 
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {user.email}
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 max-w-xs">
                <div className="truncate" title={user.bio}>
                  {user.bio || 'Generating...'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit user"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete user"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
}