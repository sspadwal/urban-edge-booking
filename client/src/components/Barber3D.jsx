import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars, Sparkles } from "@react-three/drei";

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2;
            sphereRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.2}>
                <MeshDistortMaterial
                    color="#f59e0b" // Amber-500
                    attach="material"
                    distort={0.5} // Strength of distortion
                    speed={2} // Speed of distortion
                    roughness={0.2}
                    metalness={0.9}
                />
            </Sphere>
        </Float>
    );
};

const Barber3D = () => {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#f59e0b" />

                {/* 3D Objects */}
                <AnimatedSphere />

                {/* Environment Particles */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#fbbf24" />
            </Canvas>
        </div>
    );
};

export default Barber3D;
