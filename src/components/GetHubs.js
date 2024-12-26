import React, { useState, useEffect } from "react";
import fetchGraphQLData from "./GraphQLQuery";
import Dropdown from "./DropdownUI";
import GetProjects from "./GetProjects";

const GET_HUBS_QUERY = `
  query GetHubs {
    hubs {
      results {
        id
        name
      }
    }
  }
`;

const GetHubs = ({ accessToken }) => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHub, setSelectedHub] = useState("");

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const data = await fetchGraphQLData(accessToken, GET_HUBS_QUERY);
        if (data && data.hubs) {
          setHubs(data.hubs.results);
        } else {
          setHubs([]);
        }
      } catch (err) {
        setError("Failed to fetch hubs.");
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, [accessToken]);

  const handleHubSelect = (hubId) => {
    setSelectedHub(hubId);
  };

  return (
    <div>
      <h1>Select Account</h1>
      <Dropdown
        options={hubs}
        selectedValue={selectedHub}
        onSelect={setSelectedHub}
        loading={loading}
        error={error}
      />
      {selectedHub && <GetProjects accessToken={accessToken} hubId={selectedHub} />}
    </div>
  );
};

export default GetHubs;
