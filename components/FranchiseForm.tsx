import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Input, Select, Textarea, Button } from './FormControls';
import * as api from '../lib/api';

const FranchiseForm: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        profession: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await api.submitFranchiseForm(formData);
            if(result.success) {
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
             <div ref={ref} className="text-center p-8 bg-green-100 border-l-8 border-brand-green rounded-2xl shadow-lg mt-8">
                <h3 className="text-2xl font-baloo font-bold text-brand-green mb-2">Thank You!</h3>
                <p className="text-dark-text">Your franchise enquiry has been submitted. Our team will contact you soon!</p>
            </div>
        )
    }

    return (
        <div ref={ref} className={`bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-3xl shadow-2xl transition-all duration-1000 text-dark-text ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <h3 className="text-3xl font-baloo font-bold text-brand-blue mb-6 text-center">Franchise Enquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Full Name" name="name" type="text" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                    <Input label="Email Address" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Input label="Phone Number" name="phone" type="tel" placeholder="10-digit mobile number" required value={formData.phone} onChange={handleChange} />
                     <Input label="City of Interest" name="city" type="text" placeholder="e.g. Mumbai" required value={formData.city} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Input label="State" name="state" type="text" placeholder="e.g. Maharashtra" required value={formData.state} onChange={handleChange} />
                     <Select label="Current Profession" name="profession" required value={formData.profession} onChange={handleChange}>
                        <option value="">Select Profession</option>
                        <option value="business">Business Owner</option>
                        <option value="salaried">Salaried Employee</option>
                        <option value="other">Other</option>
                    </Select>
                </div>
                <div>
                    <Textarea label="Your Message (Optional)" name="message" placeholder="Tell us a bit about why you're interested in Funshala." value={formData.message} onChange={handleChange} />
                </div>
                <div>
                     <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Enquire Now'}</Button>
                </div>
            </form>
        </div>
    );
};

export default FranchiseForm;
