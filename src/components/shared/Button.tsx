import * as React from "react";

export function Button({ text, onTap, className, disabled }) {
    return (
        <button
            className={`${className} ${disabled ? 'opacity-50' : ''}`}
            onTap={onTap}
            isEnabled={!disabled}
        >
            {text}
        </button>
    );
}