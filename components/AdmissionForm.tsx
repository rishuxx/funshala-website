import { CheckCircle2, User, Users, ShieldCheck } from 'lucide-react';
import React, { useState, useEffect } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Input, Select, Button } from "./FormControls";
import * as api from "../lib/api";

const AdmissionForm: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<{ name: string; age: string }[]>([]);

  const [formData, setFormData] = useState({
    childName: "",
    dob: "",
    gender: "",
    program: "",
    parentName: "",
    email: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await api.programsAPI.get();
        setPrograms(
          data.map((p: any) => ({
            name: p.title,
            age: p.ageGroup,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }
    };
    fetchPrograms();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.submitAdmissionForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission failed", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS STATE ================= */

  if (submitted) {
    return (
      <div ref={ref} className="bg-white rounded-3xl p-8 sm:p-10 border border-green-200 shadow-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-chalk text-sm font-bold mb-2">
          Application Received!
        </span>
        <h3 className="text-2xl md:text-3xl font-bold font-fredoka text-gray-900 mb-3">
          Welcome to Funshala Family!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
          Thank you for trusting us with your child's early education journey. Our admissions counselor will reach out via phone/WhatsApp within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              childName: "",
              dob: "",
              gender: "",
              program: "",
              parentName: "",
              email: "",
              phone: "",
              city: "",
            });
          }}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-fredoka font-bold text-sm shadow-md transition-all"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-chalk text-xs font-bold mb-2 tracking-wide">
          Quick & Easy Online Application
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-fredoka text-gray-900">
          Admission Application Form
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Begin your child's joyful learning journey. All fields marked with * are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child Details */}
        <div className="bg-orange-50/40 border border-orange-100/80 p-5 rounded-2xl">
          <h4 className="text-sm font-bold font-fredoka text-orange-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> Child Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Child's Full Name"
              name="childName"
              type="text"
              required
              value={formData.childName}
              onChange={handleChange}
              placeholder="e.g., Aarav Kumar"
            />
            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
            />
            <Select
              label="Gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <Select
              label="Program of Interest"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
            >
              <option value="">Select Program</option>
              {programs.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.age})
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Parent Details */}
        <div className="bg-blue-50/30 border border-blue-100/80 p-5 rounded-2xl">
          <h4 className="text-sm font-bold font-fredoka text-blue-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" /> Parent / Guardian Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Parent's / Guardian's Name"
              name="parentName"
              type="text"
              required
              value={formData.parentName}
              onChange={handleChange}
              placeholder="e.g., Priya Sharma"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., priya@email.com"
            />
            <Input
              label="Phone Number (WhatsApp preferred)"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +91 98765 43210"
            />
            <Input
              label="City / Locality"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g., Prayagraj"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-3 font-fredoka font-bold text-base shadow-lg shadow-orange-500/20">
            {loading ? "Submitting Application..." : "Submit Admission Application →"}
          </Button>
          <p className="text-xs text-gray-400 mt-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600 inline" /> Your data is safe</span>. We never share family contact info with third parties.
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
