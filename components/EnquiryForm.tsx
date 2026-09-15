import React, { useState } from "react";
import { Input, Textarea, Button } from "./FormControls";
import * as api from "../lib/api";

const EnquiryForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.submitContactForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Enquiry form submission failed", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-green-50 border border-green-200 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-fredoka font-bold text-green-700 mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600 text-sm max-w-sm mx-auto mb-4">
          Thank you for reaching out. We will get back to you as soon as possible!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", message: "" });
          }}
          className="text-xs font-fredoka font-bold text-orange-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          name="name"
          type="text"
          placeholder="e.g., Priya Sharma"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Your Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="e.g., +91 98765 43210"
        required
        value={formData.phone}
        onChange={handleChange}
      />
      <Textarea
        label="Your Message / Query"
        name="message"
        placeholder="Ask anything about admissions, school timings, fee structure, or bus facilities..."
        required
        value={formData.message}
        onChange={handleChange}
      />
      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 font-fredoka font-bold text-base shadow-lg shadow-orange-500/20"
        >
          {loading ? "Sending..." : "Send Message →"}
        </Button>
      </div>
    </form>
  );
};

export default EnquiryForm;
