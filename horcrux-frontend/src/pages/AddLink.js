// src/pages/AddLink.js
import React from "react";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";

const AddLink = () => {
  const handleLinkCreated = (newLink) => {
    // This function can be used to update the list if needed
    // Currently, LinkList fetches its own data, so this might not be necessary
  };

  return (
    <div>
      <LinkForm onLinkCreated={handleLinkCreated} />
      {/* <LinkList /> */}
      {/* To Display List on the bottom of Form Page */}
    </div>
  );
};

export default AddLink;
