import React, { useState, useEffect } from "react";
import fetchGraphQLData from "./GraphQLQuery";
import Dropdown from "./DropdownUI";

const GET_FOLDER_CONTENT_QUERY = `
  query GetFolderContent($folderId: ID!) {
    folder(folderId: $folderId) {
      id
      name
      exchanges {
        results {
          id
          name
          alternativeIdentifiers {
            fileUrn
            fileVersionUrn
          }
          __typename
        }
      }
    }
  }
`;

const GetFolderContent = ({ accessToken, folderId, onSelectExchange }) => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExchange, setSelectedExchange] = useState("");

  useEffect(() => {
    const fetchFolderContent = async () => {
      try {
        setLoading(true);
        const data = await fetchGraphQLData(accessToken, GET_FOLDER_CONTENT_QUERY, {
          folderId,
        });

        if (data && data.folder && data.folder.exchanges.results) {
          const exchangeData = data.folder.exchanges.results.map((exchange) => ({
            id: exchange.id,
            name: exchange.name,
            fileURN: exchange.alternativeIdentifiers.fileUrn,            
          }));
          setExchanges(exchangeData);
        } else {
          setExchanges([]);
        }
      } catch (err) {
        setError("Failed to fetch folder content.");
      } finally {
        setLoading(false);
      }
    };

    if (folderId) {
      fetchFolderContent();
    }
  }, [accessToken, folderId]);

  const handleExchangeSelect = (exchangeId) => {
    setSelectedExchange(exchangeId);
    console.log("Selected Exchange ID:", exchangeId); // Debug log
    // console.log("Selected file URN:", exchanges.fileURN);
    
    if (onSelectExchange) {
      onSelectExchange(exchangeId); // Notify parent of the selected exchange
    }
  };

  return (
    <div>
      <h1>Available Exchanges</h1>
      <Dropdown
        options={exchanges}
        selectedValue={selectedExchange}
        onSelect={handleExchangeSelect}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default GetFolderContent;
