import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Scene";

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 1, 5] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        {/* <directionalLight position={[5, 10, 5]} /> */}
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#888888"
          intensity={0.6}
        />

        <Suspense fallback={null}>
          <Center>
            <Model />
          </Center>
        </Suspense>

        <OrbitControls />
      </Canvas>
    </>
  );
}
