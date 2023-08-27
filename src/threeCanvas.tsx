import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { DoubleSide, Mesh } from 'three'

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default function ThreeCanvas() {
  return (
    <div className='h-screen w-screen '>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Box />
        <ambientLight />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

const Box = () => {
  const meshRef = useRef<Mesh>(null!)

  // useFrame((state, delta) => (meshRef.current.rotation.z += delta / 10))

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3, 150, 150]} />
      <shaderMaterial fragmentShader={fragment} vertexShader={vertex} side={DoubleSide} wireframe />
    </mesh>
  )
}
