/* eslint-disable react-hooks/immutability */

import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/teeth/scene.gltf");

  // load textures
  const gumsTex = useLoader(
    THREE.TextureLoader,
    "/models/teeth/textures/Gums_diffuse.png",
  );
  const tongueTex = useLoader(
    THREE.TextureLoader,
    "/models/teeth/textures/Tongue_diffuse.png",
  );

  // GLTF textures need this
  gumsTex.flipY = false;
  tongueTex.flipY = false;

  gumsTex.colorSpace = THREE.SRGBColorSpace;
  tongueTex.colorSpace = THREE.SRGBColorSpace;

  // attach textures to materials
  materials.Gums.map = gumsTex;
  materials.Tongue.map = tongueTex;

  return (
    <group {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={4.135}>
        <group position={[-0.262, -0.314, 4.671]}>
          <mesh geometry={nodes.Object_3.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_5.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.Teeth} />
          <mesh geometry={nodes.Object_7.geometry} material={materials.Teeth} />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Tongue}
          />
        </group>
      </group>
    </group>
  );
}
