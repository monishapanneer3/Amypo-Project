import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "16px",
        backgroundColor: "#141414",
        color: "rgba(255, 255, 255, 0.75)",
        marginTop: "auto",
      }}
    >
      <p style={{ margin: 0 }}>
        EventSphere &copy; {new Date().getFullYear()} &mdash; conference
        management made simple.
      </p>
    </footer>
  );
};

export default Footer;
