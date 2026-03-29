import type { GalleryImage } from "../types";

// Point to the Express Backend Server
const API_URL = "http://localhost:5000/api";

const getAuthToken = () => {
  try {
    if (typeof window !== "undefined") {
      const adminInfo = localStorage.getItem("funshala_admin_info");
      return adminInfo ? JSON.parse(adminInfo).token : null;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const getHeaders = () => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// --- AUTH ---
export const login = async (credentials: any) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// --- FORM SUBMISSIONS ---
export const submitAdmissionForm = (formData: any) =>
  fetch(`${API_URL}/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType: "admission", formData }),
  }).then((res) => res.json());

export const submitFranchiseForm = (formData: any) =>
  fetch(`${API_URL}/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType: "franchise", formData }),
  }).then((res) => res.json());

export const submitContactForm = (formData: any) =>
  fetch(`${API_URL}/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType: "contact", formData }),
  }).then((res) => res.json());

export const getSubmissions = async (
  type: "admission" | "franchise" | "contact"
) => {
  const response = await fetch(`${API_URL}/forms?type=${type}`, {
    headers: getHeaders(),
  });
  const data = await response.json();
  return data.success ? data.data : [];
};

export const updateSubmission = async (
  id: string,
  data: { status?: string; adminNotes?: string }
) => {
  const response = await fetch(`${API_URL}/forms/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteSubmission = async (id: string) => {
  const response = await fetch(`${API_URL}/forms/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return response.json();
};

// --- GALLERY MANAGEMENT ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((img: any) => ({
        ...img,
        id: img._id,
        // Append server URL to image path if it's a local upload
        src: img.src.startsWith("http")
          ? img.src
          : `http://localhost:5000${img.src}`,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
};

export const addImageToGallery = async (formData: FormData) => {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Note: Do NOT set Content-Type header when sending FormData, browser sets it with boundary
  const response = await fetch(`${API_URL}/gallery/upload`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  return response.json();
};

export const deleteGalleryImage = async (id: string) => {
  const response = await fetch(`${API_URL}/gallery/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return response.json();
};

export const updateGalleryImage = async (
  id: string,
  data: { alt: string; category: string }
) => {
  const response = await fetch(`${API_URL}/gallery/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

// --- GENERIC CRUD ---
const createCRUDFunctions = <T>(resource: string) => {
  const get = async (): Promise<T[]> => {
    const res = await fetch(`${API_URL}/${resource}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return data.success
      ? data.data.map((item: any) => ({ ...item, id: item._id }))
      : [];
  };

  const create = async (itemData: Omit<T, "id">): Promise<T> => {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return { ...data.data, id: data.data._id };
  };

  const update = async (id: string, itemData: Partial<T>): Promise<T> => {
    const res = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return { ...data.data, id: data.data._id };
  };

  const remove = async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
  };

  return { get, create, update, remove };
};

export const studentsAPI = createCRUDFunctions("students");
export const programsAPI = createCRUDFunctions("programs");
export const eventsAPI = createCRUDFunctions("events");
