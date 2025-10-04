import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import UserTable from './UserTable';
import SearchFilters from './SearchFilters';
import UserModal from './UserModal';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/api';

export default function UserManagementDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole, filterStatus]);

  const fetchUsers = async () => {
    try {
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => 
        user.role.toLowerCase() === filterRole.toLowerCase()
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await createUser(formData);
      await fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message || 'Failed to create user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      await updateUser(id, formData);
      await fetchUsers();
      setShowModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message || 'Failed to update user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setError(null);
        await deleteUser(id);
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setError(null);
  };

  const roles = [...new Set(users.map(u => u.role))];

 return (
    <div className="w-screen h-screen overflow-hidden">
  <div className="w-full h-full flex flex-col">
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <UserCircle className="text-indigo-600" size={36} />
            User Management
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Manage users with AI-generated insights
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg"
        >
          <span className="text-xl font-bold">+</span>
          Add User
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="mb-6">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          roles={roles}
        />
      </div>

      {/* User Table */}
      <div className="flex-1 overflow-y-auto">
        <UserTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>

    {/* User Modal */}
    {showModal && (
      <UserModal
        user={editingUser}
        onClose={handleCloseModal}
        onSave={editingUser ? handleUpdateUser : handleCreateUser}
        loading={loading}
      />
    )}
  </div>
</div>

  );
}