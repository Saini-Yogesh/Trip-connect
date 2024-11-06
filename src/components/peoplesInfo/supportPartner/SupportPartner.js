import ScannerImage from "./scanner.png";

const SupportPartner = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4vmin",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ height: "10vmin" }}></div>
      <h3
        style={{
          padding: "2vmin",
          fontSize: "3vmin",
          color: "#333",
          fontWeight: "bold",
          animation: "pulse 2s infinite",
        }}
      >
        Want to make a difference? <br /> Scan to securely send a little support
        my way!
      </h3>

      <img
        src={ScannerImage}
        alt="Scanner for donations"
        style={{
          height: "auto",
          width: "50vmin",
          marginTop: "2vmin",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "2vmin",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      />

      <p style={{ color: "#4CAF50", fontSize: "3vmin", marginTop: "3vmin" }}>
        Every little bit helps—thank you!
      </p>

      <style>
        {`
          @keyframes pulse {
            0% { color: #333; }
            50% { color: #4CAF50; }
            100% { color: #333; }
          }
        `}
      </style>
    </div>
  );
};

export default SupportPartner;
