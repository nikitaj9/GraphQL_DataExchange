// graphqlService.js
export const fetchGraphQLData = async (accessToken, query, variables = {}) => {
    try {
      const response = await fetch("https://developer.api.autodesk.com/dataexchange/2023-05/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Region: "US",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });
  
      if (!response.ok) {
        throw new Error(`GraphQL API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors.map((err) => err.message).join(", "));
      }
  
      return data.data;
    } catch (error) {
      console.error("Error fetching GraphQL data:", error.message);
      return null;
    }
};

export default fetchGraphQLData;
