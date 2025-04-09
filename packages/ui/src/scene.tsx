"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent, useLoader } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export type EventKind = "login" | "signup";

interface Props {
  dispatch: (event: EventKind) => void;
}

const activeTargets = new Set(["login", "signup"]);

export const Scene = ({ dispatch }: Props) => {
  const [active, setActive] = useState(false);
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const glb = useLoader(GLTFLoader, "/egen.glb");

  const getActiveTarget = useCallback((obj: Object3D): Mesh | null => {
    if (obj instanceof Mesh) {
      return activeTargets.has(obj.name) ? obj : null;
    } else {
      return null;
    }
  }, []);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatch(e.object.name as EventKind);
  }, []);

  const onPointerEnter = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (getActiveTarget(e.object) !== null) {
      const mesh = e.object as Mesh;
      const active_mat = glb.materials[e.object.name + "_active"];
      if (active_mat) {
        mesh.material = active_mat;
        setActive(true);
      }
    }
  }, []);

  const onPointerLeave = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (getActiveTarget(e.object) !== null) {
      const mesh = e.object as Mesh;
      const active_mat = glb.materials[e.object.name];
      if (active_mat) {
        mesh.material = active_mat;
        setActive(false);
      }
    }
  }, []);

  return (
    <Canvas ref={canvas_ref} className={active ? "pointer" : ""}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <group
        onClick={handleClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <primitive object={glb.scene} />
      </group>
      <OrbitControls />
    </Canvas>
  );
};
