import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/teeth/scene-transformed.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_3.geometry}
        material={materials.Gums}
        position={[-1.084, 19.314, 1.298]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={4.135}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Teeth}
        position={[-1.084, 19.314, 1.298]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={4.135}
      />
      <mesh
        geometry={nodes.Object_8.geometry}
        material={materials.Tongue}
        position={[-1.084, 19.314, 1.298]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={4.135}
      />
    </group>
  );
}

useGLTF.preload("/models/teeth/scene-transformed.glb");