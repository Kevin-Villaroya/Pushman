import React from "react";
import { FaCircleNotch } from "react-icons/fa";

import ModalError from "./modalError";

const ModalContent = ({ loading, error, fileContent }) => {
    return (
        <div className="w-2/5 h-3/5 bg-zinc-300 rounded-lg p-4 text-black flex flex-col justify-center items-center">
            {loading ? (
                <div className="loader-container flex items-center justify-center">
                    <FaCircleNotch size={40} className="animate-spin" />
                </div>
            ) : error ? (
                    <ModalError error={error} />
            ) : (
                <pre>{fileContent}</pre>
            )}
        </div>
    );
};

export default ModalContent;
