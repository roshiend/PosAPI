import React from 'react';
import OptionItem from './OptionItem';
import { Option } from '../../types/variants';

interface OptionsListProps {
  options: Option[];
  onUpdateOption: (option: Option) => void;
  onRemoveOption: (optionId: string) => void;
  onRemoveOptionValue: (optionId: string, value: string) => void;
}

export default function OptionsList({ 
  options, 
  onUpdateOption, 
  onRemoveOption,
  onRemoveOptionValue 
}: OptionsListProps) {
  return (
    <div className="p-4 space-y-4">
      {options.map(option => (
        <OptionItem
          key={option.id}
          option={option}
          onUpdate={onUpdateOption}
          onRemove={onRemoveOption}
          onRemoveValue={(value) => onRemoveOptionValue(option.id, value)}
        />
      ))}
    </div>
  );
}