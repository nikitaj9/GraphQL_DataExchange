import React, { useState, useEffect } from "react";
import fetchGraphQLData from "./GraphQLQuery";
import Dropdown from "./DropdownUI";
import GetFolderContent from "./GetFolderContent";

const GET_TOP_FOLDERS_QUERY = `
    query GetTopFolders($projectId: ID!) {
      topFolders(projectId: $projectId) {
        results {
          id
          name
          folders {
            results {
              id
              name
            }
          }
        }
      }
    }
  `;

const TopFolders = ({ accessToken, projectId, onSelectSubFolder }) => {
  const [folders, setFolders] = useState([]);
  const [subFolders, setSubFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");

  useEffect(() => {
    const fetchTopFolders = async () => {
      try {
        setLoading(true);
        const data = await fetchGraphQLData(accessToken, GET_TOP_FOLDERS_QUERY, {
          projectId,
        });
        if (data && data.topFolders && data.topFolders.results) {
          // Flatten subfolders
          const allSubFolders = data.topFolders.results.flatMap((folder) =>
            folder.folders.results.map((subFolder) => ({
              id: subFolder.id,
              name: subFolder.name,
            }))
          );
          setFolders(data.topFolders.results); // Keep top folders if needed in the future
          setSubFolders(allSubFolders); // Use subfolders for dropdown
        } else {
          setSubFolders([]);
        }
      } catch (err) {
        setError("Failed to fetch top folders.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopFolders();
  }, [accessToken, projectId]);

  const handleSubFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
    console.log("Selected Subfolder ID:", folderId); // Debug log
    if (onSelectSubFolder) {
      onSelectSubFolder(folderId); // Notify parent of the selected subfolder
    }
  };

  return (
    <div>
      <h1>Select Sub Folder</h1>
      <Dropdown
        options={subFolders}
        selectedValue={selectedFolder}
        onSelect={handleSubFolderSelect}
        loading={loading}
        error={error}
      />
      {selectedFolder && <GetFolderContent accessToken={accessToken} folderId={selectedFolder} />}
    </div>
  );
};

export default TopFolders;
