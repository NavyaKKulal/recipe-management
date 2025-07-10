import React from "react";

export default function InputField({ type, value, placeholder, onChange }) {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder} // ✅ Make sure placeholder is applied here
            onChange={onChange}
            className="p-3 border rounded-md w-full text-white placeholder-white-500"
        />
    );
}
