// src/pages/Archives.js
import React, { useEffect, useState } from "react";
import { getArchivedLinks } from "../services/api"; // You'll need to implement this API call
import LinkItem from "../components/LinkItem";
import { getLinks, deleteLink } from "../services/api";

const Archives = () => {
  const [archivedLinks, setArchivedLinks] = useState([]);

  useEffect(() => {
    fetchArchivedLinks();
  }, []);

  const fetchArchivedLinks = async () => {
    try {
      const data = await getArchivedLinks();
      setArchivedLinks(data);
    } catch (error) {
      console.error("Error fetching archived links:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      const updatedLinks = archivedLinks.filter((link) => link.id !== id);
      setArchivedLinks(updatedLinks);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div>
      <h2>Archived Horcruxes</h2>
      {archivedLinks.length === 0 ? (
        <p>No archived Horcruxes found.</p>
      ) : (
        archivedLinks.map((link) => (
          <LinkItem key={link.id} link={link} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default Archives;
