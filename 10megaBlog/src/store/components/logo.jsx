import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div className={`w-[${width}] flex items-center`}>
            <span className="font-bold text-2xl">10megaBlog</span>
        </div>
    )
}

export default Logo;