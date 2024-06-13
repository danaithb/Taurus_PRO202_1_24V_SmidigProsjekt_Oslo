import React from "react";

// Simple endpage
export function EndPage() {
  return (
    <div
      style={{
        fontFamily: "Pixelify sans",
        backgroundColor: "#B8E6B7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#000000", fontSize: "5vw" }}>TAKK FOR I DAG!</h1>
      <p style={{ color: "#000000", fontSize: "3vw" }}>
        VI ØNSKER GJERNE DIN TILBAKEMELDING
      </p>
      <p
        style={{
          color: "#29b3d5",
          fontSize: "3vw",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        BLI MED I TREKNINGEN PÅ ET GAVEKORT TIL KANTINEN DIN!
      </p>
    </div>
  );
}
