// /* eslint-disable react/no-unescaped-entities */
// "use client"

// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF, useTexture, Text, Html, Float } from '@react-three/drei';
// import { Suspense, useRef, useState, useEffect, ReactNode } from 'react';
// import * as THREE from 'three';
// import { motion } from 'framer-motion';

// // Custom shader material for glowing text
// const GlowMaterial = (color: number = 0x00ffff, intensity: number = 1.5): THREE.ShaderMaterial => {
//   return new THREE.ShaderMaterial({
//     uniforms: {
//       glowColor: { value: new THREE.Color(color) },
//       intensity: { value: intensity }
//     },
//     vertexShader: `
//       varying vec3 vNormal;
//       void main() {
//         vNormal = normalize(normalMatrix * normal);
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform vec3 glowColor;
//       uniform float intensity;
//       varying vec3 vNormal;
//       void main() {
//         float glow = pow(abs(vNormal.z), intensity);
//         gl_FragColor = vec4(glowColor, glow);
//       }
//     `,
//     transparent: true,
//     blending: THREE.AdditiveBlending
//   });
// };

// interface MouseParallaxProps {
//   children: ReactNode;
// }

// // Mouse position tracker for parallax effects
// function MouseParallax({ children }: MouseParallaxProps): JSX.Element {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       // Normalize mouse position to range -1 to 1
//       const x = (e.clientX / window.innerWidth) * 2 - 1;
//       const y = -(e.clientY / window.innerHeight) * 2 + 1;
//       setMousePosition({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useFrame(() => {
//     if (groupRef.current) {
//       // Subtle rotation based on mouse position
//       groupRef.current.rotation.y = mousePosition.x * 0.05;
//       groupRef.current.rotation.x = mousePosition.y * 0.05;
//     }
//   });

//   return <group ref={groupRef}>{children}</group>;
// }

// interface FloatingElementProps {
//   position: [number, number, number];
//   children: ReactNode;
//   speed?: number;
//   rotationFactor?: number;
//   floatIntensity?: number;
// }

// // Floating element with depth effect
// function FloatingElement({ 
//   position, 
//   children, 
//   speed = 1, 
//   rotationFactor = 0.2, 
//   floatIntensity = 0.5 
// }: FloatingElementProps): JSX.Element {
//   const ref = useRef<THREE.Group>(null);
//   const time = useRef<number>(0);
  
//   useFrame((_, delta) => {
//     time.current += delta * speed;
//     if (ref.current) {
//       ref.current.position.y = position[1] + Math.sin(time.current) * floatIntensity * 0.2;
//       ref.current.rotation.x = Math.sin(time.current * 0.5) * rotationFactor * 0.1;
//       ref.current.rotation.z = Math.sin(time.current * 0.3) * rotationFactor * 0.1;
//     }
//   });

//   return (
//     <group ref={ref} position={position}>
//       {children}
//     </group>
//   );
// }

// function Room(): JSX.Element {
//   const textures = useTexture({ map: '/textures/123.jpg' });

//   return (
//     <group>
//       {/* Floor */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
//         <planeGeometry args={[15, 15]} />
//         <meshStandardMaterial {...textures} />
//       </mesh>

//       {/* Walls */}
//       <mesh position={[0, 2.5, -7.5]}>
//         <boxGeometry args={[15, 5, 0.2]} />
//         <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.7} />
//       </mesh>
      
//       {/* Ceiling */}
//       <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
//         <planeGeometry args={[15, 15]} />
//         <meshStandardMaterial color="#111111" />
//       </mesh>
      
//       {/* Side Walls */}
//       <mesh position={[-7.5, 2.5, 0]}>
//         <boxGeometry args={[0.2, 5, 15]} />
//         <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
//       </mesh>
      
//       <mesh position={[7.5, 2.5, 0]}>
//         <boxGeometry args={[0.2, 5, 15]} />
//         <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
//       </mesh>
      
//       {/* Back Wall */}
//       <mesh position={[0, 2.5, 7.5]}>
//         <boxGeometry args={[15, 5, 0.2]} />
//         <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.7} />
//       </mesh>
//     </group>
//   );
// }

// function Desk(): JSX.Element {
//   const textures = useTexture({ map: '/textures/table_wood.jpg' });

//   return (
//     <group>
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[4, 0.2, 2]} />
//         <meshStandardMaterial {...textures} />
//       </mesh>

//       {/* Desk Legs */}
//       {[[-1.8, -0.9, 0.8], [1.8, -0.9, 0.8], [-1.8, -0.9, -0.8], [1.8, -0.9, -0.8]].map(([x, y, z], i) => (
//         <mesh key={i} position={[x, y, z]}>
//           <cylinderGeometry args={[0.1, 0.1, 1.5]} />
//           <meshStandardMaterial color="#555" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function Computer(): JSX.Element {
//   const screenRef = useRef<THREE.Mesh>(null);
  
//   useFrame(({ clock }) => {
//     if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
//       // Subtle glow animation on the screen
//       screenRef.current.material.emissiveIntensity = 0.7 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
//     }
//   });

//   return (
//     <group position={[0, 0.3, 0]}>
//       {/* Monitor */}
//       <mesh position={[0, 0.6, 0.7]}>
//         <boxGeometry args={[1.8, 1.2, 0.1]} />
//         <meshStandardMaterial color="#222" />
//       </mesh>
      
//       {/* Screen */}
//       <mesh position={[0, 0.6, 0.76]} ref={screenRef}>
//         <planeGeometry args={[1.6, 1]} />
//         <meshStandardMaterial 
//           color="#0066cc" 
//           emissive="#4499ff" 
//           emissiveIntensity={0.8} 
//           toneMapped={false} 
//         />
//       </mesh>

//       {/* Keyboard */}
//       <mesh position={[0, 0.2, 0.3]}>
//         <boxGeometry args={[1.6, 0.05, 0.4]} />
//         <meshStandardMaterial color="#333" />
//       </mesh>

//       {/* Mouse */}
//       <mesh position={[0.9, 0.2, 0.3]}>
//         <sphereGeometry args={[0.1, 32, 32]} />
//         <meshStandardMaterial color="#666" />
//       </mesh>
      
//       {/* Code display */}
//       <Html position={[0, 0.6, 0.77]} transform scale={0.15} distanceFactor={1.5}>
//         <div style={{ 
//           width: '800px', 
//           height: '500px', 
//           backgroundColor: '#0d1117', 
//           padding: '20px',
//           fontFamily: 'monospace',
//           color: '#e6edf3',
//           overflow: 'hidden'
//         }}>
//           <pre style={{ margin: 0 }}>
//             <code style={{ color: '#c9d1d9' }}>
// {`function Portfolio() {
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     // Initialize projects
//     loadProjects().then(() => {
//       setIsLoading(false);
//     });
//   }, []);

//   return (
//     <div className="portfolio">
//       <h1>Welcome</h1>
//       <p>Building the future with code...</p>
//     </div>
//   );
// }`}
//             </code>
//           </pre>
//         </div>
//       </Html>
//     </group>
//   );
// }

// function Programmer(): JSX.Element {
//   try {
//     const { scene } = useGLTF('/models/human_model.glb');
//     return <primitive object={scene} position={[0, -1, 0.5]} scale={0.7} />;
//   } catch (error) {
//     // Fallback if model doesn't load
//     return (
//       <mesh position={[0, 0, 0.5]}>
//         <capsuleGeometry args={[0.3, 1, 8, 16]} />
//         <meshStandardMaterial color="#888888" />
//         <mesh position={[0, 0.7, 0]}>
//           <sphereGeometry args={[0.25, 32, 32]} />
//           <meshStandardMaterial color="#ffdbac" />
//         </mesh>
//       </mesh>
//     );
//   }
// }

// interface Skill {
//   name: string;
//   color: string;
//   position: [number, number, number];
//   size: number;
//   speed: number;
// }

// function FloatingSkills(): JSX.Element {
//   const skills: Skill[] = [
//     { name: "React", color: "#61dafb", position: [-3, 3, -3], size: 0.4, speed: 0.8 },
//     { name: "Node.js", color: "#8cc84b", position: [-1.5, 4, -4], size: 0.3, speed: 0.7 },
//     { name: "JavaScript", color: "#f7df1e", position: [0, 3.5, -3.5], size: 0.35, speed: 0.9 },
//     { name: "TypeScript", color: "#3178c6", position: [1.5, 3.8, -4], size: 0.3, speed: 0.85 },
//     { name: "Three.js", color: "#ff6a00", position: [3, 3.2, -3], size: 0.4, speed: 0.75 },
//     { name: "AI", color: "#ff4081", position: [2.5, 2.5, -2.5], size: 0.45, speed: 0.65 },
//     { name: "Systems", color: "#4caf50", position: [-2.5, 2.8, -2.8], size: 0.4, speed: 0.6 }
//   ];

//   return (
//     <group>
//       {skills.map((skill, index) => (
//         <FloatingElement 
//           key={index} 
//           position={skill.position} 
//           speed={skill.speed} 
//           floatIntensity={0.8} 
//           rotationFactor={0.3}
//         >
//           <Text 
//             color={skill.color} 
//             fontSize={skill.size}
//             material={GlowMaterial(new THREE.Color(skill.color).getHex(), 1.2)}
//           >
//             {skill.name}
//           </Text>
//         </FloatingElement>
//       ))}
//     </group>
//   );
// }

// function FloatingButtons(): JSX.Element {
//   return (
//     <Html position={[0, 0, 3]} transform>
//       <div style={{ 
//         width: '500px', 
//         display: 'flex', 
//         justifyContent: 'center', 
//         perspective: '1000px',
//         gap: '20px'
//       }}>
//         {['Projects', 'About Me', 'Contact', 'Resume'].map((text, i) => (
//           <motion.button
//             key={i}
//             initial={{ opacity: 0, y: 20, rotateX: 45 }}
//             animate={{ 
//               opacity: 1, 
//               y: 0, 
//               rotateX: 0,
//               z: i * 30
//             }}
//             transition={{ 
//               delay: 0.5 + i * 0.2, 
//               duration: 0.5,
//               type: 'spring',
//               stiffness: 100
//             }}
//             whileHover={{ 
//               scale: 1.1, 
//               y: -5,
//               rotateY: 5,
//               boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
//             }}
//             style={{
//               padding: '10px 20px',
//               fontSize: '18px',
//               fontWeight: 'bold',
//               color: 'white',
//               background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
//               backdropFilter: 'blur(4px)',
//               transform: `translateZ(${i * 20}px)`,
//               zIndex: 10 - i
//             }}
//           >
//             {text}
//           </motion.button>
//         ))}
//       </div>
//     </Html>
//   );
// }

// function WallContent(): JSX.Element {
//   return (
//     <Html position={[0, 2.5, -7.3]} transform>
//       <div style={{ width: '600px', color: 'white', textAlign: 'center' }}>
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ 
//             delay: 0.2, 
//             duration: 0.8,
//             type: 'spring',
//             stiffness: 100 
//           }}
//           style={{
//             fontSize: '3.5rem',
//             fontWeight: 'bold',
//             marginBottom: '1.5rem',
//             background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))'
//           }}
//         >
//           Md. Emamul Mursalin
//         </motion.h1>

//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//           style={{
//             fontSize: '1.5rem',
//             color: '#d0a5ff',
//             marginBottom: '2rem',
//             letterSpacing: '1px',
//             textShadow: '0 2px 5px rgba(0,0,0,0.3)'
//           }}
//         >
//           System Architecture Specialist | Web Developer | AI Innovator
//         </motion.div>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.8 }}
//           transition={{ delay: 0.8, duration: 0.7 }}
//           style={{
//             fontSize: '1.2rem',
//             color: '#e0e0e0',
//             lineHeight: 1.6,
//             maxWidth: '80%',
//             margin: '0 auto',
//             textShadow: '0 1px 3px rgba(0,0,0,0.2)'
//           }}
//         >
//           Crafting innovative solutions at the intersection of system architecture,
//           web development, and artificial intelligence. Let's build something amazing together.
//         </motion.p>
//       </div>
//     </Html>
//   );
// }

// // Particles in the background
// function ParticleField(): JSX.Element {
//   const count = 200;
//   const particlesRef = useRef<THREE.Points>(null);
//   const positionArray = new Float32Array(count * 3);
//   const speedArray = new Float32Array(count);
  
//   for (let i = 0; i < count; i++) {
//     // Random positions in 3D space
//     positionArray[i * 3] = (Math.random() - 0.5) * 20;
//     positionArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
//     positionArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
//     // Random speeds
//     speedArray[i] = 0.02 + Math.random() * 0.1;
//   }
  
//   useFrame(() => {
//     if (particlesRef.current) {
//       const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
//       for (let i = 0; i < count; i++) {
//         // Move particles upward
//         positions[i * 3 + 1] += speedArray[i];
        
//         // Reset position when particle goes too high
//         if (positions[i * 3 + 1] > 5) {
//           positions[i * 3 + 1] = -5;
//         }
//       }
      
//       particlesRef.current.geometry.attributes.position.needsUpdate = true;
//     }
//   });
  
//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positionArray}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={0.05} color="#aaaaff" transparent opacity={0.7} />
//     </points>
//   );
// }

// export default function Scene(): JSX.Element {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   //@ts-ignore
//   const cameraRef = useRef<OrbitControls>(null);
  
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1
//       });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);
  
//   useFrame(() => {
//     if (cameraRef.current) {
//       // Subtle camera movement based on mouse position
//       const camera = cameraRef.current.object;
//       camera.position.x = 7 + mousePosition.x * 0.5;
//       camera.position.y = 3 + mousePosition.y * 0.5;
//       camera.lookAt(0, 1, 0);
//     }
//   });

//   return (
//     <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
//       <Canvas camera={{ position: [7, 3, 7], fov: 50 }}>
//         <Suspense fallback={null}>
//           <MouseParallax>
//             {/* Ambient lighting */}
//             <ambientLight intensity={0.3} />
            
//             {/* Main spotlight */}
//             <spotLight 
//               position={[0, 8, 0]} 
//               angle={0.5} 
//               intensity={0.8} 
//               penumbra={1} 
//               castShadow 
//             />
            
//             {/* Accent lights */}
//             <pointLight position={[-5, 2, -3]} intensity={0.5} color="#ff9999" />
//             <pointLight position={[5, 2, -3]} intensity={0.5} color="#99ccff" />
            
//             <ParticleField />
//             <Room />
//             <Desk />
//             <Computer />
//             <Programmer />
//             <FloatingSkills />
//             <WallContent />
//             <FloatingButtons />
            
//             {/* Add floating text with glow effect */}
//             <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
//               <Text 
//                 position={[0, 4.5, -5]} 
//                 fontSize={0.6} 
//                 color="#ffffff"
//                 material={GlowMaterial(0x8844ff, 2)}
//               >
//                 Portfolio
//               </Text>
//             </Float>
//           </MouseParallax>
          
//           <OrbitControls 
//             ref={cameraRef}
//             enableZoom={true}
//             enablePan={true}
//             maxPolarAngle={Math.PI / 2} 
//             minDistance={5} 
//             maxDistance={15}
//             enableDamping
//             dampingFactor={0.1}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }