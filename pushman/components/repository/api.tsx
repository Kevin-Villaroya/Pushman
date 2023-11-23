const searchOpenApi = async (folderPath, owner, name, token) => {
    const apiUrl = 'https://api.github.com/repos/' + owner + '/' + name + '/contents/' + folderPath;

    const headers = {
        Authorization: 'Bearer' + token,
    };

    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    const subfolders = data.filter((item) => item.type === "dir");
    const targetFile = data.find(
        (item) =>
            item.name === "openapi.yml" || item.name === "openapi.yaml"
    );

    if (subfolders.length > 0) {
        const subfolderPromises = subfolders.map((subfolder) => {
            return searchOpenApi(folderPath + "/"+ subfolder.name, owner, name, token);
        });

        const subfolderResults = await Promise.all(subfolderPromises);
        const subfolderContent = subfolderResults.find(result => result !== null);

        if (subfolderContent) {
            return subfolderContent;
        }
    }

    if (targetFile) {
        const contentResponse = await fetch(targetFile.download_url);
        const content = await contentResponse.text();
        return content;
    }

    return null;
};

export { searchOpenApi };