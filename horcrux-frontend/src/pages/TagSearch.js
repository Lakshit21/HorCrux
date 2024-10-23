// src/pages/TagSearch.js
import React, { useState, useEffect } from "react";
import { getLinks, getUniqueTags, deleteLink } from "../services/api";
import TagInput from "../components/TagInput";
import LinkItem from "../components/LinkItem";

const TagSearch = () => {
  const [tags, setTags] = useState([]);
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getLinks();
      setAllLinks(data);
      setFilteredLinks(data);
      // const allTags = data.flatMap((link) => link.tags);
      const allTags = await getUniqueTags();
      const uniqueTags = Array.from(new Set(allTags));
      setTagSuggestions(uniqueTags);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleSearch = (appliedTags) => {
    setTags(appliedTags);
    if (appliedTags.length === 0) {
      setFilteredLinks(allLinks);
      return;
    }
    const filtered = allLinks.filter((link) =>
      appliedTags.every((tag) => link.tags.includes(tag)),
    );
    setFilteredLinks(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      const updatedLinks = allLinks.filter((link) => link.id !== id);
      setAllLinks(updatedLinks);
      setFilteredLinks(updatedLinks);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div>
      <h2>Tag Search</h2>
      <TagInput
        tags={tags}
        setTags={handleSearch}
        suggestions={tagSuggestions}
      />
      <div>
        {filteredLinks.length === 0 ? (
          <p>No Horcruxes found with the selected tags.</p>
        ) : (
          filteredLinks.map((link) => (
            <LinkItem key={link.id} link={link} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default TagSearch;
