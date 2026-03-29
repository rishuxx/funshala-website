import React, { useState, useEffect } from 'react';
import { Input, Select, Textarea, Button } from './FormControls';

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  fields: Field[];
  initialData?: any;
  loading: boolean;
}

const CrudModal: React.FC<CrudModalProps> = ({ isOpen, onClose, onSubmit, title, fields, initialData = {}, loading }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    // When initialData changes (e.g., when opening modal for editing), update the form state.
    // If we open for create, initialData will be empty.
    const initialFormState = fields.reduce((acc, field) => {
        let value = initialData[field.name] || '';
        // Format date for date input
        if (field.type === 'date' && value) {
            try {
                value = new Date(value).toISOString().split('T')[0];
            } catch(e) {
                value = '';
            }
        }
        acc[field.name] = value;
        return acc;
    }, {} as any);
    setFormData(initialFormState);
  }, [initialData, fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: Field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      name: field.name,
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
      value: formData[field.name] || '',
      onChange: handleChange,
      required: true,
    };

    if (field.type === 'textarea') {
      return <Textarea {...commonProps} />;
    }
    if (field.type === 'select') {
      return (
        <Select {...commonProps}>
          <option value="">Select {field.label}</option>
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      );
    }
    return <Input {...commonProps} type={field.type || 'text'} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-baloo font-bold text-brand-blue">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map(renderField)}
                <div className="pt-4 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-bold font-baloo rounded-full hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CrudModal;
