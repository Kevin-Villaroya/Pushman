import React, { useState, useEffect } from "react";

import ModalContent from "./ModalContent";
import { searchOpenApi } from "components/repository/api";

const RepositoryModal = ({ setShowModal, name, owner, token }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileContent, setContent] = useState("");

    useEffect(() => {
        const initialFolder = "";
        searchForFile(initialFolder);
    }, [owner, name, token]);

    const searchForFile = async (folderPath) => {
        let content = await searchOpenApi(folderPath, owner, name, token);
        if (content === null) {
            setError("No openapi file found");
        } else {
            setContent(content);
        }

        setLoading(false);
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50"
            onClick={closeModal}
        >
            <ModalContent loading={loading} error={error} fileContent={fileContent} />
        </div>
    );
};

export default RepositoryModal;
