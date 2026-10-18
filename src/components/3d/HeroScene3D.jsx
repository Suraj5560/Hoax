import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    // 2. Renderer with smooth anti-aliasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Cyber Threat Globe: Geodesic Wireframe Sphere
    const globeGeo = new THREE.IcosahedronGeometry(1.7, 4);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x1F2A68,
      emissive: 0x141B4D,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globeWire = new THREE.Mesh(globeGeo, globeMat);
    rootGroup.add(globeWire);

    // 4. Inner Glowing Plasma Core
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3D5CE6,
      transparent: true,
      opacity: 0.18,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 5. Global Threat Node Cloud (Pulsing cyber defense points)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const safeMint = new THREE.Color(0x2BB673);
    const signalCoral = new THREE.Color(0xFF4D5E);
    const lilacHaze = new THREE.Color(0xCBB8FF);

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere surface
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 1.72 + (Math.random() * 0.08);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color coding: green (safe), coral (threat), lilac (cyber node)
      const rand = Math.random();
      const nodeColor = rand > 0.85 ? signalCoral : rand > 0.4 ? lilacHaze : safeMint;

      particleColors[i * 3] = nodeColor.r;
      particleColors[i * 3 + 1] = nodeColor.g;
      particleColors[i * 3 + 2] = nodeColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const nodeCloud = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(nodeCloud);

    // 6. Equatorial Cyber Radar Sweep Disc
    const radarGeo = new THREE.RingGeometry(0.1, 2.2, 64);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0xCBB8FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      wireframe: false,
    });
    const radarDisc = new THREE.Mesh(radarGeo, radarMat);
    radarDisc.rotation.x = Math.PI / 2;
    rootGroup.add(radarDisc);

    // 7. Dual Orbital Precision Rings
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.012, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x3D5CE6, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.008, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xCBB8FF, transparent: true, opacity: 0.45 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.2;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    // 8. Dynamic Threat Beam Arc (Simulating intercepted scam attack)
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.4, 0.8, 0.9),
      new THREE.Vector3(0, 2.4, 0.5),
      new THREE.Vector3(1.3, -0.6, 1.0)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.025, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xFF4D5E, transparent: true, opacity: 0.75 });
    const attackArc = new THREE.Mesh(tubeGeo, tubeMat);
    rootGroup.add(attackArc);

    // 9. Floating Satellite Defense Sentinels
    const satGroup = new THREE.Group();
    rootGroup.add(satGroup);

    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x2BB673 });

    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 4) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 0.4, Math.sin(angle) * 2.35);
      satGroup.add(sat);
    }

    // 10. Ambient & Accent Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xCBB8FF, 3.5, 60);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x3D5CE6, 3, 50);
    rimLight.position.set(-4, -2, 4);
    scene.add(rimLight);

    // Mouse Interaction with Smooth Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.45;
      mouseY = y * 0.45;

      if (isDragging) {
        const deltaX = (e.clientX - prevMouseX) * 0.008;
        const deltaY = (e.clientY - prevMouseY) * 0.008;
        rootGroup.rotation.y += deltaX;
        rootGroup.rotation.x += deltaY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera / group rotation with gentle inertia
      if (!isDragging) {
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        rootGroup.rotation.y += 0.004;
        rootGroup.rotation.x = -targetY + Math.sin(elapsed * 0.5) * 0.06;
      }

      // Rotate sub-components at realistic telemetry rates
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.005;
      radarDisc.rotation.z += 0.015;
      satGroup.rotation.y += 0.008;

      // Pulse the attack arc opacity
      tubeMat.opacity = 0.4 + Math.sin(elapsed * 4) * 0.35;

      // Pulse core
      coreMesh.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.04);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 480;
      const newH = container.clientHeight || 480;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      radarGeo.dispose();
      radarMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] mx-auto flex flex-col items-center select-none">
      
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-80 sm:h-96 md:h-[420px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
        title="Interactive Threat Intelligence Globe (Click & drag to rotate)"
      />

      {/* Cyber HUD Telemetry Badges */}
      <div className="w-full px-4 -mt-4 flex items-center justify-between text-[11px] font-mono text-indigo-900/60 dark:text-lilac-haze/70 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-cloud-dark/80 backdrop-blur-md border border-indigo-900/10 dark:border-white/10 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-safe-mint animate-pulse" />
          <span>RADAR ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-cloud-dark/80 backdrop-blur-md border border-indigo-900/10 dark:border-white/10 shadow-xs">
          <span>THREAT DEFENSE: 99.4%</span>
        </div>
      </div>
      
      <p className="text-[11px] font-mono text-indigo-900/40 dark:text-indigo-400 mt-2 text-center">
        Global Threat Intelligence Globe (Interactive: Drag to rotate)
      </p>
    </div>
  );
}
