import React from "react";

const AdminBox: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="relative group mb-10">
      {/* Dashed Border */}
      <div
        className="absolute -inset-[3px] border border-dashed 
        border-orange-400/60 rounded-3xl 
        group-hover:border-orange-500/80 transition-all duration-300"
      />

      <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default AdminBox;
