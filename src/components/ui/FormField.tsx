import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, className = "" }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <Label className="text-xs font-semibold text-white uppercase tracking-wide flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </Label>
    {children}
  </div>
);