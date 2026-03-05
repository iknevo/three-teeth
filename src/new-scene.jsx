import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export function ModelNew({ selectedTooth, setSelectedTooth }) {
  const { nodes, materials } = useGLTF("/models/teeth/new.glb");
  const [hoveredTooth, setHoveredTooth] = useState(null);

  const upperTeeth = [
    {
      meshName: "Object_7006",
      toothId: 1,
      toothName: "Upper Right Third Molar (Wisdom tooth)"
    },
    {
      meshName: "Object_7005",
      toothId: 2,
      toothName: "Upper Right Second Molar"
    },
    {
      meshName: "Object_7004",
      toothId: 3,
      toothName: "Upper Right First Molar"
    },
    {
      meshName: "Object_7003",
      toothId: 4,
      toothName: "Upper Right Second Premolar (second bicuspid)"
    },
    {
      meshName: "Object_7002",
      toothId: 5,
      toothName: "Upper Right First Premolar (first bicuspid)"
    },
    {
      meshName: "Object_7007",
      toothId: 6,
      toothName: "Upper Right Canine (cuspid)"
    },
    {
      meshName: "Object_7001",
      toothId: 7,
      toothName: "Upper Right Lateral incisor"
    },
    {
      meshName: "Object_7",
      toothId: 8,
      toothName: "Upper Right Central incisor"
    },

    {
      meshName: "Object_7008",
      toothId: 9,
      toothName: "Upper Left Central incisor"
    },
    {
      meshName: "Object_7009",
      toothId: 10,
      toothName: "Upper Left Lateral incisor"
    },
    {
      meshName: "Object_7015",
      toothId: 11,
      toothName: "Upper Left Canine (cuspid)"
    },
    {
      meshName: "Object_7010",
      toothId: 12,
      toothName: "Upper Left First Premolar (first bicuspid)"
    },
    {
      meshName: "Object_7011",
      toothId: 13,
      toothName: "Upper Left Second Premolar (second bicuspid)"
    },
    {
      meshName: "Object_7012",
      toothId: 14,
      toothName: "Upper Left First Molar"
    },
    {
      meshName: "Object_7013",
      toothId: 15,
      toothName: "Upper Left Second Molar"
    },
    {
      meshName: "Object_7014",
      toothId: 16,
      toothName: "Upper Left Third Molar (Wisdom tooth)"
    }
  ];

  const lowerTeeth = [
    {
      meshName: "Object_6012",
      toothId: 17,
      toothName: "Lower Left Third Molar (Wisdom tooth)"
    },
    {
      meshName: "Object_6011",
      toothId: 18,
      toothName: "Lower Left Second Molar"
    },
    {
      meshName: "Object_6010",
      toothId: 19,
      toothName: "Lower Left First Molar"
    },
    {
      meshName: "Object_6009",
      toothId: 20,
      toothName: "Lower Left Second Premolar (second bicuspid)"
    },
    {
      meshName: "Object_6008",
      toothId: 21,
      toothName: "Lower Left First Premolar (first bicuspid)"
    },
    {
      meshName: "Object_6013",
      toothId: 22,
      toothName: "Lower Left Canine (cuspid)"
    },
    {
      meshName: "Object_6014",
      toothId: 23,
      toothName: "Lower Left Lateral incisor"
    },
    {
      meshName: "Object_6015",
      toothId: 24,
      toothName: "Lower Left Central incisor"
    },
    {
      meshName: "Object_6007",
      toothId: 25,
      toothName: "Lower Right Central incisor"
    },
    {
      meshName: "Object_6006",
      toothId: 26,
      toothName: "Lower Right Lateral incisor"
    },
    {
      meshName: "Object_6005",
      toothId: 27,
      toothName: "Lower Right Canine (cuspid)"
    },
    {
      meshName: "Object_6",
      toothId: 28,
      toothName: "Lower Right First Premolar (first bicuspid)"
    },
    {
      meshName: "Object_6001",
      toothId: 29,
      toothName: "Lower Right Second Premolar (second bicuspid)"
    },
    {
      meshName: "Object_6002",
      toothId: 30,
      toothName: "Lower Right First Molar"
    },
    {
      meshName: "Object_6003",
      toothId: 31,
      toothName: "Lower Right Second Molar"
    },
    {
      meshName: "Object_6004",
      toothId: 32,
      toothName: "Lower Right Third Molar (Wisdom tooth)"
    }
  ];

  const teeth = [...upperTeeth, ...lowerTeeth];

  const handleClick = (m) => {
    console.log(m);
  };

  const getToothColor = (m) => {
    if (selectedTooth?.toothId === m.toothId) return "#ff6b6b";
    if (hoveredTooth?.toothId === m.toothId) return "#ffd6d6";
    return "#ffffff";
  };

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={4.135}>
        <group position={[-0.262, -0.314, 4.671]}>
          {/* gums */}
          <mesh geometry={nodes.Object_3.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_5.geometry} material={materials.Gums} />

          {/* teeth */}
          {teeth.map((m) => (
            <mesh
              key={m.meshName}
              geometry={nodes[m.meshName].geometry}
              material={materials.Teeth}
              onPointerEnter={(e) => {
                e.stopPropagation();
                setHoveredTooth(m);
              }}
              onPointerLeave={(e) => {
                e.stopPropagation();
                setHoveredTooth(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTooth(m);
                handleClick(m);
              }}
            >
              <meshStandardMaterial color={getToothColor(m)} />
            </mesh>
          ))}

          {/* tongue */}
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Tongue}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/teeth/new.glb");
