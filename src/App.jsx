import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Model } from "./Scene";
import { ModelNew } from "./new-scene";

export default function App() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  console.log({ selectedTooth });
  return (
    <>
      <Canvas
        camera={{ position: [0, 1, 5] }}
        style={{ width: "100vw", height: "95vh" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#888888"
          intensity={0.6}
        />

        <Suspense fallback={null}>
          <Center>
            {/* <Model /> */}
            <ModelNew
              selectedTooth={selectedTooth}
              setSelectedTooth={setSelectedTooth}
            />
          </Center>
        </Suspense>

        <OrbitControls />
      </Canvas>
      <p
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "white",
          padding: "10px",
          borderRadius: "6px"
        }}
      >
        {selectedTooth?.toothName
          ? `${selectedTooth.toothId} : ${selectedTooth.toothName}`
          : "Click a tooth"}
      </p>
    </>
  );
}
