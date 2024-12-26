import React, { useState, useEffect } from "react";
import fetchGraphQLData from "./GraphQLQuery";
import Dropdown from "./DropdownUI";
import TopFolders from "./GetTopFolders";

const GET_PROJECTS_QUERY = `
  query GetProjects($hubId: ID!) {
    projects(hubId: $hubId) {
      results {
        id
        name
      }
    }
  }
`;

const GetProjects = ({ accessToken, hubId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchGraphQLData(accessToken, GET_PROJECTS_QUERY, {
          hubId,
        });
        if (data && data.projects) {
          setProjects(data.projects.results);
        } else {
          setProjects([]);
        }
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [accessToken, hubId]);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div>
      <h1>Select Project</h1>
      <Dropdown
        options={projects}
        selectedValue={selectedProject}
        onSelect={setSelectedProject}
        loading={loading}
        error={error}
      />
      {selectedProject && <TopFolders accessToken={accessToken} projectId={selectedProject} />}
    </div>
  );
};

export default GetProjects;
