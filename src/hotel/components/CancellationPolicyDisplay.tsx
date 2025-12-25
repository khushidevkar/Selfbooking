
import React from 'react';
import { CancellationPolicy } from '../types/hotel';
import { formatCancelPolicies } from '../utils/hotel.utils';
import { icons } from '@/index';

interface CancellationPolicyDisplayProps {
  policies: CancellationPolicy[];
  mealType?: string;
  isRefundable?: boolean;
}

const CancellationPolicyDisplay: React.FC<CancellationPolicyDisplayProps> = ({
  policies,
  mealType,
  isRefundable,
}) => {
  const formattedPolicies = formatCancelPolicies(policies);
  console.log("formattedPolicies", formattedPolicies);
  
  // Non-cancellable
  if (formattedPolicies.length === 0) {
    return (
      <div className="text-xs text-red-600 flex items-center gap-2">
        <icons.X className="w-4 h-4" />
        Non Cancellable
      </div>
    );
  }

  return (
    <div className="text-xs text-green-700 space-y-1">
      {formattedPolicies.map((policy, index) => {
        const CheckIcon = icons.Check;

        return (
          <div key={index} className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-green-700 mt-0.5" />
            <span>{policy}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CancellationPolicyDisplay;

