import React from 'react';

const Files = ({ acceptedFiles }) => {
    return ( 
        <ul className = "w-10/12">
            { acceptedFiles.map( file => (
                <li 
                    key = { file.lastModified } 
                    className = "bg-white flex-1 p-3 mb-4 shadow-lg rounded"
                >
                    <p className="font-bold text-xl">
                        { file.path }
                    </p>

                    <p className="text-sm text-gray-500">
                        {( file.size / Math.pow(1024, 2) ).toFixed(2)} MB
                    </p>
                </li>
            ))}
        </ul>
    );
}
 
export default Files;