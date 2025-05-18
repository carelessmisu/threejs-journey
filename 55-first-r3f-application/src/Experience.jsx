import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useThree, extend, useFrame } from '@react-three/fiber';
import CustomObject from './CustomObject';

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  // console.log(three);
  const cubeRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // console.log('tick');
    // console.log(delta);
    // console.log(state.camera);
    // console.log(state.clock);

    // const angle = state.clock.elapsedTime;
    // console.log(angle);
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta
  });

  return (
    <>
      <CustomObject />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <orbitControls args={[camera, gl.domElement]} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          {/* <sphereGeometry args={[1.5, 32, 32]}/> */}
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
