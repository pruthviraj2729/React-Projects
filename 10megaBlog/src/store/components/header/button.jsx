import React from 'react'

function Button({
    children,
    type = 'button',
    bg = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
    
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bg} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
