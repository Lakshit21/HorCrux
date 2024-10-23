// src/components/LinkItem.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LinkItem.css"; // Create this CSS file for styling

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/sunburst.css";
// https://highlightjs.org/examples

const LinkItem = ({ link, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this Horcrux?")) {
      onDelete(link.id);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${link.id}`);
  };

  const handleVisit = () => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="link-item">
      {/* Title */}
      <h3>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent triggering edit on link click
        >
          {link.title}
        </a>
      </h3>

      {/* URL */}
      <p>
        <strong>URL:</strong>{" "}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {link.url}
        </a>
      </p>

      {/* Tags */}

      <p>
        <strong>Tags:</strong> {link.tags.join(", ")}
      </p>

      {/* Crux */}

      <div className="crux-box">
        <p>
          {" "}
          <strong>Crux:</strong>{" "}
        </p>
        {/* <ReactMarkdown>{link.crux}</ReactMarkdown> */}
        <ReactMarkdown
          children={link.crux}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        />
      </div>

      {/* Creation & Updation Tags */}

      <div className="create-update-label">
        <span>
          <em>Created At: {new Date(link.created_at).toLocaleString()}</em>
        </span>
        <span> | </span>
        <span>
          <em>Updated At: {new Date(link.updated_at).toLocaleString()}</em>
        </span>
      </div>
      <p> </p>

      {/* Delete Button  */}

      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        Delete
      </button>

      {/* Edit Button  */}

      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        Edit
      </button>

      {/* Visit Button  */}

      <button
        className="visit-button"
        onClick={(e) => {
          e.stopPropagation();
          handleVisit();
        }}
      >
        Visit
      </button>

      {/* End */}
    </div>
  );
};

export default LinkItem;
