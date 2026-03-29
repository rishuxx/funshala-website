
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Input: React.FC<InputProps> = ({ label, name, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      {...props}
      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}
export const Select: React.FC<SelectProps> = ({ label, name, children, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      {...props}
      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors appearance-none"
    >
      {children}
    </select>
  </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}
export const Textarea: React.FC<TextareaProps> = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            rows={4}
            {...props}
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
        />
    </div>
);


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full px-8 py-4 bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold font-baloo rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);
