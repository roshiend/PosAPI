import React, { useState } from 'react';
import { Edit, X, GripVertical } from 'lucide-react';
import { Option } from '../../types/variants';

interface OptionItemProps {
  option: Option;
  onUpdate: (option: Option) => void;
  onRemove: (optionId: string) => void;
  onRemoveValue: (value: string) => void;
}

export default function OptionItem({ 
  option, 
  onUpdate, 
  onRemove,
  onRemoveValue 
}: OptionItemProps) {
  const [isEditing, setIsEditing] = useState(!option.name);
  const [editName, setEditName] = useState(option.name);

  const handleSave = () => {
    if (editName.trim()) {
      onUpdate({ ...option, name: editName.trim() });
      setIsEditing(false);
    }
  };

  const addValue = (value: string) => {
    if (value && !option.values.includes(value)) {
      onUpdate({
        ...option,
        values: [...option.values, value]
      });
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <GripVertical className="text-gray-400" size={20} />
          {isEditing ? (
            <input
              type="text"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSave}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Option name (e.g. Color, Size)"
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-medium">{option.name || 'Unnamed option'}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => onRemove(option.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {option.values.map(value => (
          <span
            key={value}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {value}
            <button
              onClick={() => onRemoveValue(value)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter a value"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const value = e.currentTarget.value.trim();
              if (value) {
                addValue(value);
                e.currentTarget.value = '';
              }
            }
          }}
        />
      </div>
    </div>
  );
}