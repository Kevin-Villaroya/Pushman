import React from "react";

const ModalError = ({ error }) => {
    return (
        <div className="error-message bg-red-100 text-red-600 p-4 rounded-md">
            <p className="text-xl font-semibold">Error</p>
            <p>{error}</p>
        </div>
    );
};

export default ModalError;
