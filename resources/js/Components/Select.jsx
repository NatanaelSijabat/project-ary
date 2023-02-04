import React from "react";

export default function Select({ name, value, onChange, pajaks }) {
    return (
        <div className="field-group">
            <select
                name={name}
                id="pajak"
                onChange={onChange}
                value={value}
                className="w-full mb-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
                <option value="" selected disabled hidden>
                    -- Pajak --
                </option>
                {pajaks.map((pajak) => (
                    <option key={pajak.id} value={pajak.id}>
                        {pajak.nama}
                    </option>
                ))}
            </select>
        </div>
    );
}
