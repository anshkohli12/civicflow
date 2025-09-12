import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminService } from "../services/adminService";
import { issueService } from "../services/issueService";
import { ArrowLeft, Download, BarChart3, Eye, Trash2, User, Calendar, MapPin, ThumbsUp, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";

const AdminIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [issues, searchTerm, statusFilter, categoryFilter]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await issueService.getAllIssues();
      setIssues(response.data || response || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast.error("Failed to fetch issues");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...issues];

    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (categoryFilter !== "ALL") {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    setFilteredIssues(filtered);
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      setActionLoading(true);
      await adminService.updateIssueStatus(issueId, newStatus);
      toast.success(`Issue status updated to ${newStatus}`);
      fetchIssues();
    } catch (error) {
      console.error("Error updating issue status:", error);
      toast.error("Failed to update issue status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    
    try {
      setActionLoading(true);
      await adminService.deleteIssue(issueId);
      toast.success("Issue deleted successfully");
      fetchIssues();
    } catch (error) {
      console.error("Error deleting issue:", error);
      toast.error("Failed to delete issue");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadge = (category) => {
    const colors = {
      "Infrastructure": "bg-blue-100 text-blue-800",
      "Transportation": "bg-purple-100 text-purple-800",
      "Environment": "bg-green-100 text-green-800",
      "Safety": "bg-red-100 text-red-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Management</h1>
            <p className="text-gray-600">Manage and monitor all issues in the system</p>
          </div>
          <Link to="/admin" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-gray-900">{issues.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {issues.filter(i => i.status === "PENDING").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {issues.filter(i => i.status === "IN_PROGRESS").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {issues.filter(i => i.status === "RESOLVED").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component continues with filters and table... */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search issues..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Transportation">Transportation</option>
            <option value="Environment">Environment</option>
            <option value="Safety">Safety</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                      <div className="text-sm text-gray-500">{issue.location || "No location"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(issue.category)}`}>
                      {issue.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(issue.status)}`}
                      disabled={actionLoading}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{issue.createdBy?.username || "Unknown"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{formatDate(issue.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(issue)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={actionLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Detail Modal */}
      {showDetailModal && selectedIssue && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Issue Details</h3>
              <button onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedIssue.title}</h4>
                <p className="text-gray-600">{selectedIssue.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="font-medium">Category:</span> {selectedIssue.category}</div>
                <div><span className="font-medium">Status:</span> {selectedIssue.status}</div>
                <div><span className="font-medium">Location:</span> {selectedIssue.location || "Not specified"}</div>
                <div><span className="font-medium">Created:</span> {formatDate(selectedIssue.createdAt)}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIssuesPage;
