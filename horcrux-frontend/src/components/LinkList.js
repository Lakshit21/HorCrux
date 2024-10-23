// src/components/LinkList.js
import React, { useEffect, useState } from "react";
import { getLinks, deleteLink } from "../services/api";
import LinkItem from "./LinkItem";
import Filter from "./Filter";

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [filters, setFilters] = useState({
    tags: [],
    date: null,
    cruxAvailable: false,
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getLinks();
      setLinks(data);
      setFilteredLinks(data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleLinkCreated = (newLink) => {
    setLinks([newLink, ...links]);
    setFilteredLinks([newLink, ...filteredLinks]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      const updatedLinks = links.filter((link) => link.id !== id);
      setLinks(updatedLinks);
      setFilteredLinks(updatedLinks);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleFilter = (appliedFilters) => {
    setFilters(appliedFilters);
    let tempLinks = [...links];

    // Filter by tags
    if (appliedFilters.tags.length > 0) {
      tempLinks = tempLinks.filter((link) =>
        appliedFilters.tags.every((tag) => link.tags.includes(tag)),
      );
    }

    // Filter by crux availability
    if (appliedFilters.cruxAvailable) {
      tempLinks = tempLinks.filter(
        (link) => link.crux && link.crux.trim() !== "",
      );
    }

    // Future: Filter by date

    setFilteredLinks(tempLinks);
  };

  return (
    <div>
      <Filter onFilter={handleFilter} />
      <h2>Horcruxes</h2>
      {filteredLinks.map((link) => (
        <LinkItem key={link.id} link={link} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default LinkList;
