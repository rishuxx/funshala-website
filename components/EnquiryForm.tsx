import React, { useState } from 'react';
import { Input, Textarea, Button } from './FormControls';
import * as api from '../lib/api';

const EnquiryForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await api.submitContactForm(formData);
             if(result.success) {
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
            <div className="text-center p-8 bg-green-100 border-l-8 border-brand-green rounded-2xl shadow-lg">
                <h3 className="text-2xl font-baloo font-bold text-brand-green mb-2">Message Sent!</h3>
                <p className="text-dark-text">Thank you for reaching out. We'll get back to you as soon as possible!</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Your Name" name="name" type="text" placeholder="e.g., Priya Sharma" required value={formData.name} onChange={handleChange} />
            <Input label="Your Email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange}/>
            <Input label="Your Phone Number" name="phone" type="tel" placeholder="So we can call you back" required value={formData.phone} onChange={handleChange} />
            <Textarea label="Your Message" name="message" placeholder="How can we help you today?" required value={formData.message} onChange={handleChange}/>
            <div>
                <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
            </div>
        </form>
    );
};

export default EnquiryForm;
