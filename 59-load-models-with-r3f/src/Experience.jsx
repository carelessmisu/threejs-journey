import Model from './Model';
import { Suspense } from 'react';
import Placeholder from './Placeholder';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Hambuger from './Hambuger';
import Fox from './Fox';

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        {/* <Model /> */}
        <Hambuger scale={0.35} />
      </Suspense>

      <Fox />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
