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
      <div ref={ref} className="max-w-3xl mx-auto relative">
        {/* Dashed Border */}
        <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

        <div className="relative bg-white rounded-3xl p-10 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-3">
            Thank You!
          </h3>
          <p className="text-gray-700 max-w-xl mx-auto">
            Your admission request has been received successfully. Our team will
            contact you shortly with the next steps.
          </p>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div
      ref={ref}
      className={`max-w-4xl mx-auto relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Dashed Border */}
      <div className="absolute -inset-[3px] border border-dashed border-orange-400/60 rounded-3xl" />

      {/* Inner Card */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Admission Application
        </h3>
        <p className="text-gray-600 text-center mb-10">
          Begin your child's joyful learning journey with Funshala
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Child Details */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Child Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Parent / Guardian Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="e.g., priya.sharma@email.com"
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +91 98765 43210"
              />
              <Input
                label="City"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Mumbai"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
