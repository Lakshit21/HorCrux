import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const availableTags = [];

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const filteredSuggestions = availableTags.filter((tag) =>
    tag.startsWith(tagInput),
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFilter(tags);
      }}
    >
      <h3>Filter Links</h3>
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagInputKeyDown}
        placeholder="Search tags..."
      />
      <div>
        {filteredSuggestions.map((tag, index) => (
          <div key={index}>{tag}</div>
        ))}
      </div>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}{" "}
            <button type="button" onClick={() => removeTag(index)}>
              x
            </button>
          </span>
        ))}
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default Filter;
