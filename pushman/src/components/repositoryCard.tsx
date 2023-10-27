import React from 'react';

const RepositoryCard = ({ name, owner, description, url }) => {
    return (
        <div className="w-3/5 bg-gray shadow-md rounded-lg m-4 flex justify-center items-center flex-col">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600">Owner: {owner}</p>
            <p className="text-gray-700">{description}</p>
            <a
                href={url}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                View on GitHub
            </a>
        </div>
    );
};

export default RepositoryCard;
