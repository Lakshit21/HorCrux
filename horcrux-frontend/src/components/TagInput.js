// src/components/TagInput.js
import React, { useState, useEffect } from "react";
import "./TagInput.css";
import { v4 as uuidv4 } from "uuid";

const TagInput = ({ tags, setTags, suggestions }) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (input) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [input, suggestions]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInput("");
    setFilteredSuggestions([]);
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  return (
    <div className="tag-input-container">
      <div className="tags">
        {tags.map((tag, index) => (
          <div className="tag-item" key={uuidv4()}>
            {tag}
            <button type="button" onClick={() => removeTag(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag and press Enter"
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li key={uuidv4()} onClick={() => addTag(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
