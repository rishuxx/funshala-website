import React, { useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { Input, Select, Textarea, Button } from "./FormControls";
import * as api from "../lib/api";

const FranchiseForm: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    profession: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.submitFranchiseForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Franchise form submission failed", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        ref={ref}
        className="text-center p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-green-200"
      >
        <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">
          ✓
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-chalk text-sm font-bold mb-2">
          Proposal Received!
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-fredoka text-gray-900 mb-3">
          Thank You for Your Interest!
        </h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Our business expansion director will connect with you within 24–48 hours to discuss project feasibility, investment details, and location setup.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              city: "",
              state: "",
              profession: "",
              message: "",
            });
          }}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-fredoka font-bold text-sm shadow-md transition-all"
        >
          Submit Another Proposal
        </button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-outfit text-xs font-semibold mb-2 tracking-wide">
          Quick Franchise Expression of Interest
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-gray-900">
          Franchise Enquiry Form
        </h3>
        <p className="text-gray-500 text-sm mt-1 font-sans">
          Tell us about yourself and your preferred city/location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="e.g., Rajesh Mehta"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="rajesh@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone / Mobile Number"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="City of Proposed Center"
            name="city"
            type="text"
            placeholder="e.g., Prayagraj, Varanasi"
            required
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="State"
            name="state"
            type="text"
            placeholder="e.g., Uttar Pradesh"
            required
            value={formData.state}
            onChange={handleChange}
          />
          <Select
            label="Current Profession / Background"
            name="profession"
            required
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            <option value="business">Business Owner / Entrepreneur</option>
            <option value="educator">Teacher / Educationist</option>
            <option value="salaried">Corporate / Salaried Professional</option>
            <option value="other">Other</option>
          </Select>
        </div>

        <div>
          <Textarea
            label="Additional Notes / Space Availability (Optional)"
            name="message"
            placeholder="Share if you already own/rent a property or have any specific questions."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 font-outfit font-semibold text-base shadow-lg shadow-orange-500/20"
          >
            {loading ? "Submitting..." : "Send Franchise Proposal →"}
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Confidential inquiry. We respect your privacy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default FranchiseForm;
