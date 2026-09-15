import type { GalleryImage } from "../types";
import { supabase } from "./supabase";

// --- AUTH & SECURE SESSION ---
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (err: any) {
    return { success: false, message: err.message || "Login failed" };
  }
};

export const logout = async () => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};

export const updateAdminPassword = async (newPassword: string) => {
  try {
    if (newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { success: true, message: "Password updated successfully!" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

// --- FORM SUBMISSIONS ---
export const submitAdmissionForm = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from("admission_applications")
      .insert({
        child_name: formData.childName || "",
        dob: formData.dob || new Date().toISOString().split("T")[0],
        gender: formData.gender || "other",
        program_name: formData.program || "General",
        parent_name: formData.parentName || "",
        email: formData.email || "",
        phone: formData.phone || "",
        city: formData.city || "",
        status: "New",
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const submitFranchiseForm = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from("franchise_inquiries")
      .insert({
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        city: formData.city || "",
        state: formData.state || "",
        profession: formData.profession || "",
        message: formData.message || "",
        status: "New",
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const submitContactForm = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        message: formData.message || "",
        status: "New",
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getSubmissions = async (
  type: "admission" | "franchise" | "contact"
) => {
  try {
    let tableName = "admission_applications";
    if (type === "franchise") tableName = "franchise_inquiries";
    if (type === "contact") tableName = "contact_messages";

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) throw error;

    // Adapt to format expected by Admin components
    return (data || []).map((item) => ({
      _id: item.id,
      status: item.status,
      adminNotes: item.admin_notes,
      submittedAt: item.submitted_at,
      formData: {
        ...item,
        childName: item.child_name,
        parentName: item.parent_name,
      },
    }));
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
};

export const updateSubmission = async (
  id: string,
  data: { status?: string; adminNotes?: string },
  type?: "admission" | "franchise" | "contact"
) => {
  try {
    // Try updating across the three submission tables
    const updatePayload: any = {};
    if (data.status) updatePayload.status = data.status;
    if (data.adminNotes !== undefined) updatePayload.admin_notes = data.adminNotes;

    const tables = type 
      ? [type === "admission" ? "admission_applications" : type === "franchise" ? "franchise_inquiries" : "contact_messages"]
      : ["admission_applications", "franchise_inquiries", "contact_messages"];

    for (const table of tables) {
      const { data: res, error } = await supabase
        .from(table)
        .update(updatePayload)
        .eq("id", id)
        .select();

      if (!error && res && res.length > 0) {
        return { success: true, data: res[0] };
      }
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deleteSubmission = async (
  id: string,
  type?: "admission" | "franchise" | "contact"
) => {
  try {
    const tables = type
      ? [type === "admission" ? "admission_applications" : type === "franchise" ? "franchise_inquiries" : "contact_messages"]
      : ["admission_applications", "franchise_inquiries", "contact_messages"];

    for (const table of tables) {
      await supabase.from(table).delete().eq("id", id);
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// --- GALLERY MANAGEMENT (Supabase Storage + PostgreSQL) ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((img) => ({
      id: img.id,
      src: img.public_url,
      alt: img.alt_text,
      category: img.category,
    }));
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
};

export const addImageToGallery = async (formData: FormData) => {
  try {
    const file = formData.get("image") as File;
    const alt = (formData.get("alt") as string) || "Funshala Image";
    const category = (formData.get("category") as string) || "Activity";

    if (!file) throw new Error("No file uploaded");

    // Clean unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    // Upload to Supabase Storage Bucket 'gallery'
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (uploadError) throw uploadError;

    // Retrieve public URL
    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // Save record in PostgreSQL table gallery_images
    const { data: dbData, error: dbError } = await supabase
      .from("gallery_images")
      .insert({
        storage_path: fileName,
        public_url: publicUrl,
        alt_text: alt,
        category: category,
        file_name: fileName,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return {
      success: true,
      data: {
        id: dbData.id,
        src: dbData.public_url,
        alt: dbData.alt_text,
        category: dbData.category,
      },
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Upload hero banner directly to storage without adding to public gallery photos
export const uploadHeroImage = async (file: File) => {
  try {
    if (!file) throw new Error("No file selected");

    const fileExt = file.name.split(".").pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deleteGalleryImage = async (id: string) => {
  try {
    // Find image to get storage path
    const { data: img } = await supabase
      .from("gallery_images")
      .select("storage_path")
      .eq("id", id)
      .single();

    if (img && img.storage_path) {
      await supabase.storage.from("gallery").remove([img.storage_path]);
    }

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateGalleryImage = async (
  id: string,
  data: { alt: string; category: string }
) => {
  try {
    const { data: updated, error } = await supabase
      .from("gallery_images")
      .update({
        alt_text: data.alt,
        category: data.category,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// --- SITE SETTINGS (Hero & School Information) ---
export const getSiteSettings = async (key: string) => {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();
    if (error) return null;
    return data?.value;
  } catch (e) {
    return null;
  }
};

export const updateSiteSettings = async (key: string, value: any) => {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

// --- GENERIC CRUD (Students, Programs, Events) ---
export const studentsAPI = {
  get: async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((s) => ({
      ...s,
      contact: s.contact_phone,
      className: s.class_name,
      parentName: s.parent_name,
    }));
  },
  create: async (item: any) => {
    const { data, error } = await supabase
      .from("students")
      .insert({
        name: item.name,
        age: Number(item.age),
        class_name: item.className,
        parent_name: item.parentName,
        contact_phone: item.contact,
        address: item.address,
        notes: item.notes || "",
      })
      .select()
      .single();
    if (error) throw error;
    return { ...data, contact: data.contact_phone, className: data.class_name };
  },
  update: async (id: string, item: any) => {
    const { data, error } = await supabase
      .from("students")
      .update({
        name: item.name,
        age: item.age ? Number(item.age) : undefined,
        class_name: item.className,
        parent_name: item.parentName,
        contact_phone: item.contact,
        address: item.address,
        notes: item.notes,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  remove: async (id: string) => {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) throw error;
  },
};

export const programsAPI = {
  get: async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data || []).map((p) => ({
      ...p,
      ageGroup: p.age_group,
    }));
  },
  create: async (item: any) => {
    const slug = (item.title || "").toLowerCase().replace(/\s+/g, "-");
    const { data, error } = await supabase
      .from("programs")
      .insert({
        slug,
        title: item.title,
        description: item.description,
        age_group: item.ageGroup,
        duration: item.duration,
        fee: Number(item.fee),
      })
      .select()
      .single();
    if (error) throw error;
    return { ...data, ageGroup: data.age_group };
  },
  update: async (id: string, item: any) => {
    const { data, error } = await supabase
      .from("programs")
      .update({
        title: item.title,
        description: item.description,
        age_group: item.ageGroup,
        duration: item.duration,
        fee: item.fee ? Number(item.fee) : undefined,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { ...data, ageGroup: data.age_group };
  },
  remove: async (id: string) => {
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) throw error;
  },
};

export const eventsAPI = {
  get: async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });
    if (error) throw error;
    return (data || []).map((e) => ({
      ...e,
      date: e.event_date,
    }));
  },
  create: async (item: any) => {
    const { data, error } = await supabase
      .from("events")
      .insert({
        title: item.title,
        event_date: item.date,
        description: item.description,
      })
      .select()
      .single();
    if (error) throw error;
    return { ...data, date: data.event_date };
  },
  update: async (id: string, item: any) => {
    const { data, error } = await supabase
      .from("events")
      .update({
        title: item.title,
        event_date: item.date,
        description: item.description,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { ...data, date: data.event_date };
  },
  remove: async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
  },
};
