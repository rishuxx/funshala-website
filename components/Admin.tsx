import React, { useState, useEffect, useCallback } from "react";
import { Logo } from "./IconComponents";
import { Input, Button, Select, Textarea } from "./FormControls";
import * as api from "../lib/api";
import type { GalleryImage } from "../types";
import CrudModal from "./CrudModal";

// --- LOGIN FORM ---
const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api.login({ email, password });
      if (result.success) {
        localStorage.setItem(
          "funshala_admin_info",
          JSON.stringify(result.data)
        );
        onLogin();
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-2xl">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-baloo">
            Admin Panel Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            required
            placeholder="admin@funshala.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// --- GENERIC DATA TABLE ---
const DataTable: React.FC<{
  title: string;
  data: any[];
  headers: string[];
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}> = ({ title, data, headers, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <p>No {title.toLowerCase()} found.</p>;
  }
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider capitalize"
              >
                {header.replace(/([A-Z])/g, " $1")}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={item._id || item.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {headers.map((header) => (
                <td
                  key={`${item._id}-${header}`}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {typeof item[header] === "object"
                    ? JSON.stringify(item[header])
                    : item[header]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item._id || item.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-full"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- ENQUIRY MODAL (Details + Status Update) ---
const EnquiryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  submission: any;
  onUpdate: () => void;
}> = ({ isOpen, onClose, submission, onUpdate }) => {
  const [status, setStatus] = useState(submission?.status || "New");
  const [adminNotes, setAdminNotes] = useState(submission?.adminNotes || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submission) {
      setStatus(submission.status || "New");
      setAdminNotes(submission.adminNotes || "");
    }
  }, [submission]);

  if (!isOpen || !submission) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateSubmission(submission._id, { status, adminNotes });
      onUpdate();
      onClose();
    } catch (error) {
      alert("Failed to update submission");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this enquiry permanently?"
      )
    ) {
      setLoading(true);
      try {
        await api.deleteSubmission(submission._id);
        onUpdate();
        onClose();
      } catch (error) {
        alert("Failed to delete submission");
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper to format key names
  const formatKey = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h3 className="text-2xl font-baloo font-bold text-gray-800">
            Enquiry Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Submission Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
            {Object.entries(submission.formData || {}).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs font-bold text-gray-500 uppercase">
                  {formatKey(key)}
                </p>
                <p className="text-gray-800 font-medium">{String(value)}</p>
              </div>
            ))}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">
                Submitted At
              </p>
              <p className="text-gray-800 font-medium">
                {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-bold font-baloo mb-4 text-brand-blue">
              Admin Controls
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Select>
              <Textarea
                label="Internal Notes"
                name="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add private notes here..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-between">
          <button
            onClick={handleDelete}
            className="text-red-600 font-bold hover:text-red-800"
          >
            Delete Enquiry
          </button>
          <div className="space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-brand-blue text-white rounded-full font-bold hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ENQUIRY MANAGER (Table view with Status) ---
const EnquiryManager: React.FC<{
  type: "admission" | "franchise" | "contact";
  title: string;
}> = ({ type, title }) => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(
    null
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await api.getSubmissions(type);
    setSubmissions(data);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Determine headers based on type to show in main table
  const getSummaryHeaders = () => {
    switch (type) {
      case "admission":
        return ["childName", "parentName", "phone", "program"];
      case "franchise":
        return ["name", "phone", "city", "profession"];
      case "contact":
        return ["name", "email", "message"];
      default:
        return [];
    }
  };

  const summaryHeaders = getSummaryHeaders();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-baloo font-bold">{title}</h3>
        <button
          onClick={fetchData}
          className="text-sm text-brand-blue hover:underline"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Date
                </th>
                {summaryHeaders.map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase capitalize"
                  >
                    {h.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={summaryHeaders.length + 3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          sub.status || "New"
                        )}`}
                      >
                        {sub.status || "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    {summaryHeaders.map((h) => (
                      <td
                        key={h}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {sub.formData[h]?.length > 20
                          ? sub.formData[h].substring(0, 20) + "..."
                          : sub.formData[h]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubmission(sub);
                        }}
                        className="text-brand-blue hover:text-blue-900 font-bold"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <EnquiryModal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        submission={selectedSubmission}
        onUpdate={fetchData}
      />
    </div>
  );
};

// --- GALLERY MANAGER ---
const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("Activity");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchImages = useCallback(async () => {
    const galleryImages = await api.getGalleryImages();
    setImages(galleryImages);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !altText || !category) {
      setMessage("Please fill all fields and select an image.");
      return;
    }
    setLoading(true);
    setMessage("Uploading...");
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("alt", altText);
      formData.append("category", category);

      const result = await api.addImageToGallery(formData);
      if (result.success) {
        setMessage("Image uploaded successfully!");
        await fetchImages();
        // Reset form
        setImageFile(null);
        setAltText("");
        setCategory("Activity");
        (document.getElementById("imageFile") as HTMLInputElement).value = "";
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setMessage(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await api.deleteGalleryImage(id);
      await fetchImages();
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingImage(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (formData: any) => {
    if (!editingImage) return;
    setIsSubmitting(true);
    try {
      const result = await api.updateGalleryImage(
        editingImage.id.toString(),
        formData
      );
      if (result.success) {
        await fetchImages();
        handleCloseModal();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Failed to update image", error);
      alert("Failed to update image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryFields = [
    { name: "alt", label: "Alt Text" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "Activity", label: "Activity" },
        { value: "Classroom", label: "Classroom" },
        { value: "Events", label: "Events" },
        { value: "Art", label: "Art" },
      ],
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-baloo font-bold mb-4">Add New Image</h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mb-8 p-4 border rounded-lg bg-white shadow-sm"
      >
        <Input
          id="imageFile"
          label="Image File"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
          required
        />
        <Input
          label="Alt Text (Description)"
          name="altText"
          type="text"
          placeholder="e.g., Children playing with blocks"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          required
        />
        <Select
          label="Category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Activity">Activity</option>
          <option value="Classroom">Classroom</option>
          <option value="Events">Events</option>
          <option value="Art">Art</option>
        </Select>
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Image"}
        </Button>
        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </form>

      <h3 className="text-2xl font-baloo font-bold mb-4">Existing Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="text-white bg-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id.toString())}
                  className="text-white bg-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CrudModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUpdate}
        title="Edit Image Details"
        fields={galleryFields}
        initialData={editingImage || {}}
        loading={isSubmitting}
      />
    </div>
  );
};

// --- GENERIC CRUD MANAGER ---
const CrudManager: React.FC<{ api: any; title: string; fields: any[] }> = ({
  api,
  title,
  fields,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await api.get();
    setItems(data);
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await api.update(editingItem.id, formData);
      } else {
        await api.create(formData);
      }
      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to save ${title}`, error);
      alert(`Error: Could not save ${title.slice(0, -1)}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${title.slice(0, -1)}?`
      )
    ) {
      try {
        await api.remove(id);
        await fetchData();
      } catch (error) {
        console.error(`Failed to delete ${title}`, error);
        alert(`Error: Could not delete ${title.slice(0, -1)}.`);
      }
    }
  };

  if (loading) return <p>Loading {title}...</p>;

  const singularTitle = title.endsWith("s") ? title.slice(0, -1) : title;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenCreate} className="w-auto">
          Add New {singularTitle}
        </Button>
      </div>
      <DataTable
        title={title}
        data={items}
        headers={fields.map((f) => f.name)}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={
          editingItem ? `Edit ${singularTitle}` : `Add New ${singularTitle}`
        }
        fields={fields}
        initialData={editingItem || {}}
        loading={isSubmitting}
      />
    </div>
  );
};

// --- DASHBOARD ---
type AdminView =
  | "admissions"
  | "franchise"
  | "contact"
  | "gallery"
  | "students"
  | "programs"
  | "events";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<AdminView>("admissions");

  const handleLogout = () => {
    localStorage.removeItem("funshala_admin_info");
    window.location.reload();
  };

  const renderContent = () => {
    switch (view) {
      case "admissions":
        return <EnquiryManager type="admission" title="Admission Enquiries" />;
      case "franchise":
        return <EnquiryManager type="franchise" title="Franchise Enquiries" />;
      case "contact":
        return <EnquiryManager type="contact" title="Contact Messages" />;
      case "gallery":
        return <GalleryManager />;
      case "students":
        return (
          <CrudManager
            api={api.studentsAPI}
            title="Students"
            fields={[
              { name: "name", label: "Student Name" },
              { name: "age", label: "Age", type: "number" },
              { name: "className", label: "Class" },
              { name: "parentName", label: "Parent's Name" },
              { name: "contact", label: "Contact Number" },
              { name: "address", label: "Address", type: "textarea" },
              { name: "notes", label: "Notes (optional)", type: "textarea" },
            ]}
          />
        );
      case "programs":
        return (
          <CrudManager
            api={api.programsAPI}
            title="Programs"
            fields={[
              { name: "title", label: "Program Title" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "ageGroup", label: "Age Group (e.g., 2-3 Years)" },
              { name: "duration", label: "Duration (e.g., 3 hours/day)" },
              { name: "fee", label: "Fee (Monthly)", type: "number" },
            ]}
          />
        );
      case "events":
        return (
          <CrudManager
            api={api.eventsAPI}
            title="Events"
            fields={[
              { name: "title", label: "Event Title" },
              { name: "date", label: "Date", type: "date" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-baloo font-bold text-brand-blue">
          Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm">Welcome, Admin</span>
          <Button
            onClick={handleLogout}
            className="w-auto px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 from-gray-600 to-gray-700 shadow-none"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 sm:space-x-4 border-b mb-8 flex-wrap overflow-x-auto">
        {(
          [
            "admissions",
            "franchise",
            "contact",
            "gallery",
            "students",
            "programs",
            "events",
          ] as AdminView[]
        ).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`capitalize pb-2 px-3 font-bold font-baloo border-b-4 transition-colors text-sm sm:text-base whitespace-nowrap ${
              view === v
                ? "border-brand-red text-brand-red"
                : "border-transparent text-gray-500 hover:text-brand-blue"
            }`}
          >
            {v.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">{renderContent()}</div>
    </div>
  );
};

// --- MAIN ADMIN COMPONENT ---
const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const adminInfo = localStorage.getItem("funshala_admin_info");
      if (adminInfo && JSON.parse(adminInfo).token) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard />;
};

export default Admin;
