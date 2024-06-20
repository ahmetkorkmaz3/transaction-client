import React from "react";

export default function SelectFilter({ icon, options, onChangeHandler, selectedValue }) {
  return (
    <div className="relative inline-block w-64">
      <div className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 pointer-events-none">
        {icon}
      </div>
      <select className="block w-full bg-white border border-gray-300 text-black py-2 pl-12 pr-4 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChangeHandler} defaultValue={selectedValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
