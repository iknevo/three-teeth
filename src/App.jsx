import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Model } from "./Scene";
import "./index.css";

const PAIN_TYPES = [
  "Sharp Pain", "Throbbing Pain", "Dull Ache",
  "Sensitivity to Cold", "Sensitivity to Heat",
  "Pressure Pain", "Gum Pain", "Jaw Pain", "No Pain",
];

const MX = -.2;
const UY = 20.5;
const LY = 19.5;
const TZ = 1.8;

const UPPER = [
  { id: "UR8", label: "Upper Right Wisdom",      pos: [MX-1.55, UY, TZ-0.35] },
  { id: "UR7", label: "Upper Right Molar 2",     pos: [MX-1.28, UY, TZ-0.1] },
  { id: "UR6", label: "Upper Right Molar 1",     pos: [MX-1.02, UY, TZ+0.05] },
  { id: "UR5", label: "Upper Right Premolar 2",  pos: [MX-0.78, UY, TZ+0.12] },
  { id: "UR4", label: "Upper Right Premolar 1",  pos: [MX-0.56, UY, TZ+0.15] },
  { id: "UR3", label: "Upper Right Canine",      pos: [MX-0.35, UY, TZ+0.12] },
  { id: "UR2", label: "Upper Right Lateral",     pos: [MX-0.18, UY, TZ+0.05] },
  { id: "UR1", label: "Upper Right Central",     pos: [MX-0.06, UY, TZ] },
  { id: "UL1", label: "Upper Left Central",      pos: [MX+0.06, UY, TZ] },
  { id: "UL2", label: "Upper Left Lateral",      pos: [MX+0.18, UY, TZ+0.05] },
  { id: "UL3", label: "Upper Left Canine",       pos: [MX+0.35, UY, TZ+0.12] },
  { id: "UL4", label: "Upper Left Premolar 1",   pos: [MX+0.56, UY, TZ+0.15] },
  { id: "UL5", label: "Upper Left Premolar 2",   pos: [MX+0.78, UY, TZ+0.12] },
  { id: "UL6", label: "Upper Left Molar 1",      pos: [MX+1.02, UY, TZ+0.05] },
  { id: "UL7", label: "Upper Left Molar 2",      pos: [MX+1.28, UY, TZ-0.1] },
  { id: "UL8", label: "Upper Left Wisdom",       pos: [MX+1.55, UY, TZ-0.35] },
];

const LOWER = [
  { id: "LR8", label: "Lower Right Wisdom",      pos: [MX-1.50, LY, TZ-0.35] },
  { id: "LR7", label: "Lower Right Molar 2",     pos: [MX-1.24, LY, TZ-0.1] },
  { id: "LR6", label: "Lower Right Molar 1",     pos: [MX-0.98, LY, TZ+0.05] },
  { id: "LR5", label: "Lower Right Premolar 2",  pos: [MX-0.75, LY, TZ+0.12] },
  { id: "LR4", label: "Lower Right Premolar 1",  pos: [MX-0.53, LY, TZ+0.15] },
  { id: "LR3", label: "Lower Right Canine",      pos: [MX-0.33, LY, TZ+0.12] },
  { id: "LR2", label: "Lower Right Lateral",     pos: [MX-0.17, LY, TZ+0.05] },
  { id: "LR1", label: "Lower Right Central",     pos: [MX-0.06, LY, TZ] },
  { id: "LL1", label: "Lower Left Central",      pos: [MX+0.06, LY, TZ] },
  { id: "LL2", label: "Lower Left Lateral",      pos: [MX+0.17, LY, TZ+0.05] },
  { id: "LL3", label: "Lower Left Canine",       pos: [MX+0.33, LY, TZ+0.12] },
  { id: "LL4", label: "Lower Left Premolar 1",   pos: [MX+0.53, LY, TZ+0.15] },
  { id: "LL5", label: "Lower Left Premolar 2",   pos: [MX+0.75, LY, TZ+0.12] },
  { id: "LL6", label: "Lower Left Molar 1",      pos: [MX+0.98, LY, TZ+0.05] },
  { id: "LL7", label: "Lower Left Molar 2",      pos: [MX+1.24, LY, TZ-0.1] },
  { id: "LL8", label: "Lower Left Wisdom",       pos: [MX+1.50, LY, TZ-0.35] },
];

function ToothMarker({ tooth, isSelected, hasPain, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isMolar = tooth.id.match(/[678]$/);
  const w = isMolar ? 17 : 13;
  const h = isMolar ? 20 : 16;

  return (
    <Html position={tooth.pos} center zIndexRange={[100, 0]}>
      <div
        onPointerUp={(e) => { e.stopPropagation(); onClick(tooth); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={tooth.label}
        style={{
          width: w, height: h,
          borderRadius: tooth.id.startsWith("U") ? "40% 40% 35% 35%" : "35% 35% 40% 40%",
          border: isSelected ? "2px solid #ff4d6d"
            : hasPain ? "2px solid rgba(255,77,109,0.9)"
            : hovered ? "2px solid #ffd166"
            : "2px solid rgba(255,255,255,0.4)",
          background: isSelected ? "rgba(255,77,109,0.7)"
            : hasPain ? "rgba(255,77,109,0.4)"
            : hovered ? "rgba(255,209,102,0.45)"
            : "rgba(255,255,255,0.2)",
          cursor: "pointer",
          transition: "all 0.15s ease",
          transform: isSelected ? "scale(1.3)" : hovered ? "scale(1.15)" : "scale(1)",
          boxShadow: isSelected ? "0 0 18px rgba(255,77,109,1)"
            : hovered ? "0 0 10px rgba(255,209,102,0.6)" : "none",
          position: "relative",
        }}
      >
        {hasPain && !isSelected && (
          <div style={{
            position: "absolute", top: -3, right: -3,
            width: 6, height: 6, borderRadius: "50%",
            background: "#ff4d6d", boxShadow: "0 0 5px #ff4d6d",
          }} />
        )}
      </div>
    </Html>
  );
}

function SceneContent({ selectedTooth, toothData, onToothClick }) {
  return (
    <group>
      <Model />
      {[...UPPER, ...LOWER].map((tooth) => (
        <ToothMarker
          key={tooth.id}
          tooth={tooth}
          isSelected={selectedTooth?.id === tooth.id}
          hasPain={!!(toothData[tooth.id]?.painType && toothData[tooth.id]?.painType !== "No Pain")}
          onClick={onToothClick}
        />
      ))}
    </group>
  );
}

export default function App() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [toothData, setToothData] = useState({});
  const [formState, setFormState] = useState({ painType: "", note: "", date: "" });

  const handleToothClick = (tooth) => {
    if (selectedTooth?.id === tooth.id) { setSelectedTooth(null); return; }
    setSelectedTooth(tooth);
    setFormState(toothData[tooth.id] || { painType: "", note: "", date: "" });
  };

  const handleSave = () => {
    setToothData((prev) => ({ ...prev, [selectedTooth.id]: { ...formState } }));
    setSelectedTooth(null);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", background: "#0f0f14", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Canvas camera={{ position: [MX, 19.314, 18], fov: 40 }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 25, 10]} intensity={1} />
          <directionalLight position={[-5, 15, -5]} intensity={0.6} />
          <hemisphereLight skyColor="#ffffff" groundColor="#888888" intensity={0.6} />
          <Suspense fallback={null}>
            <SceneContent selectedTooth={selectedTooth} toothData={toothData} onToothClick={handleToothClick} />
          </Suspense>
          <OrbitControls target={[MX, 19.314, 1.298]} />
        </Canvas>
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          color: "#444", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
          background: "rgba(0,0,0,0.5)", padding: "6px 14px", borderRadius: 8, pointerEvents: "none",
        }}>🦷 Click a tooth to log pain</div>
      </div>

      <div style={{ width: selectedTooth ? 340 : 0, overflow: "hidden", transition: "width 0.3s cubic-bezier(.4,0,.2,1)", background: "#16161e", borderLeft: "1px solid #2a2a3a", flexShrink: 0 }}>
        {selectedTooth && (
          <div style={{ width: 340, padding: 28, display: "flex", flexDirection: "column", gap: 20, height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ color: "#ff4d6d", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Tooth {selectedTooth.id}</div>
                <div style={{ color: "#fff", fontSize: 17, fontWeight: 600 }}>{selectedTooth.label}</div>
              </div>
              <button onClick={() => setSelectedTooth(null)} style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer", padding: 0 }}>✕</button>
            </div>
            <div style={{ height: 1, background: "#2a2a3a" }} />
            <div>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Pain Type</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {PAIN_TYPES.map((pt) => (
                  <button key={pt} onClick={() => setFormState(f => ({ ...f, painType: pt }))} style={{
                    padding: "6px 12px", borderRadius: 20,
                    border: formState.painType === pt ? "2px solid #ff4d6d" : "2px solid #252530",
                    background: formState.painType === pt ? "rgba(255,77,109,0.15)" : "transparent",
                    color: formState.painType === pt ? "#ff4d6d" : "#666",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  }}>{pt}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Date</div>
              <input type="date" value={formState.date || today}
                onChange={(e) => setFormState(f => ({ ...f, date: e.target.value }))}
                style={{ width: "100%", background: "#1e1e2a", border: "1px solid #252530", borderRadius: 10, color: "#fff", padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Notes</div>
              <textarea value={formState.note}
                onChange={(e) => setFormState(f => ({ ...f, note: e.target.value }))}
                placeholder="Describe the pain, triggers, duration..."
                style={{ width: "100%", minHeight: 130, background: "#1e1e2a", border: "1px solid #252530", borderRadius: 10, color: "#fff", padding: "12px 14px", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
              />
            </div>
            <button onClick={handleSave} style={{ background: "linear-gradient(135deg, #ff4d6d, #ff6b35)", border: "none", borderRadius: 12, color: "#fff", padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Save</button>
            {Object.keys(toothData).length > 0 && (
              <div>
                <div style={{ height: 1, background: "#2a2a3a", marginBottom: 14 }} />
                <div style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Saved ({Object.keys(toothData).length})</div>
                {Object.entries(toothData).map(([id, data]) => (
                  <div key={id} style={{ background: "#1a1a26", borderRadius: 10, padding: "10px 14px", marginBottom: 8, borderLeft: "3px solid #ff4d6d" }}>
                    <div style={{ color: "#ff4d6d", fontSize: 11, fontWeight: 700 }}>{id}</div>
                    <div style={{ color: "#ccc", fontSize: 13 }}>{data.painType || "—"}</div>
                    {data.note && <div style={{ color: "#777", fontSize: 12, marginTop: 3 }}>{data.note}</div>}
                    {data.date && <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>{data.date}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}