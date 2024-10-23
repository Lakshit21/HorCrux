// src/components/LinkForm.js
import React, { useState, useEffect } from "react";
import { createLink, getLinks } from "../services/api";
import TagInput from "./TagInput";

// markdown
import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import { emoji } from "markdown-it-emoji";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbreviation from "markdown-it-abbr";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import tasklists from "markdown-it-task-lists";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return "";
  },
});

const LinkForm = ({ onLinkCreated }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [crux, setCrux] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await getLinks();
      const allTags = data.flatMap((link) => link.tags);
      const uniqueTags = Array.from(new Set(allTags));
      setTagSuggestions(uniqueTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLink = {
      title,
      url,
      tags,
      crux,
    };

    try {
      const createdLink = await createLink(newLink);
      onLinkCreated(createdLink);
      // Reset form
      setTitle("");
      setUrl("");
      setTags([]);
      setCrux("");
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setCrux(text);
    // console.log("handleEditorChange", html, text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Horcrux</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title/name of your HorCrux"
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add a valid link/url"
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
          style={{ height: "200px", backgroundColor: "#dadbda" }}
          renderHTML={(text) => mdParser.render(text)}
          value={crux}
          onChange={handleEditorChange}
        />
      </div>
      <button type="submit">Add Horcrux</button>
    </form>
  );
};

export default LinkForm;
