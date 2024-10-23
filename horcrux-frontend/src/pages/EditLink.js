// src/pages/EditLink.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLinkById, updateLink } from "../services/api";
import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
import TagInput from "../components/TagInput";

const EditLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [crux, setCrux] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);

  useEffect(() => {
    fetchLink();
  }, []);

  const fetchLink = async () => {
    try {
      const link = await getLinkById(id);
      setTitle(link.title);
      setUrl(link.url);
      setTags(link.tags);
      setCrux(link.crux);

      // Fetch all tags for suggestions
      // TODO -> UNCOMMENT THE FOLLOWING CODE

      // const allLinks = await getLinks();
      // const allTags = allLinks.flatMap((l) => l.tags);
      // const uniqueTags = Array.from(new Set(allTags));
      // setTagSuggestions(uniqueTags);
    } catch (error) {
      console.error("Error fetching link:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLink = {
      title,
      url,
      tags,
      crux,
    };

    try {
      await updateLink(id, updatedLink);
      navigate("/");
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setCrux(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Horcrux</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags:</label>
        <TagInput tags={tags} setTags={setTags} suggestions={tagSuggestions} />
      </div>
      <div>
        <label>Crux:</label>
        <MdEditor
          style={{ height: "200px" }}
          renderHTML={(text) => text}
          value={crux}
          onChange={handleEditorChange}
        />
      </div>
      <button type="submit">Update Horcrux</button>
    </form>
  );
};

export default EditLink;
