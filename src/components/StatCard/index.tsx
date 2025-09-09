import React from "react";

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};


const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div
    className="d-flex flex-column align-items-center justify-content-center card-stat py-5"

  >
    <div
      className="d-flex align-items-center justify-content-center mb-3 "
      style={{ background: "#7b61ff", borderRadius: "50%", width: 90, height: 90 }}
    >
      <span style={{ fontSize: 40, color: "#fff" }}>{icon}</span>
    </div>
    <div className="fw-bold text-center" style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>{title}</div>
    <div className="fw-bold text-center" style={{ color: "#bdbdbd", fontSize: 18, letterSpacing: 1 }}>{value}</div>
  </div>
);

export default StatCard;
