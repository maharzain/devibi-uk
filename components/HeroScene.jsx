"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const noiseGLSL = /* glsl */ `
  vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/* palettes per theme — light mode runs hotter so it pops on cream */
const PALETTES = {
  dark: { deep: "#2a0e02", mid: "#ff5e1f", hot: "#ffb36b", particleAlpha: 0.7 },
  light: { deep: "#c2400a", mid: "#ff6a2a", hot: "#ffd9ae", particleAlpha: 0.45 },
};

export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 760;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const blobUniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.42 },
      uFreq: { value: 1.15 },
      uColorDeep: { value: new THREE.Color(PALETTES.dark.deep) },
      uColorMid: { value: new THREE.Color(PALETTES.dark.mid) },
      uColorHot: { value: new THREE.Color(PALETTES.dark.hot) },
    };

    const blobMaterial = new THREE.ShaderMaterial({
      uniforms: blobUniforms,
      transparent: true,
      vertexShader: noiseGLSL + /* glsl */ `
        uniform float uTime;
        uniform float uAmp;
        uniform float uFreq;
        varying float vNoise;
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          float t = uTime * 0.35;
          float n = snoise(normal * uFreq + vec3(t, t * 0.8, t * 0.6));
          float n2 = snoise(normal * uFreq * 2.4 - vec3(t * 1.3));
          float displacement = n * uAmp + n2 * uAmp * 0.25;
          vec3 newPos = position + normal * displacement;
          vNoise = displacement;
          vec4 worldPos = modelMatrix * vec4(newPos, 1.0);
          vPosW = worldPos.xyz;
          vNormalW = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorDeep;
        uniform vec3 uColorMid;
        uniform vec3 uColorHot;
        varying float vNoise;
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosW);
          float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormalW)), 0.0), 2.2);
          float heat = smoothstep(-0.35, 0.5, vNoise);
          vec3 color = mix(uColorDeep, uColorMid, heat);
          color = mix(color, uColorHot, fresnel * 1.1);
          color += uColorHot * pow(fresnel, 3.0) * 0.9;
          gl_FragColor = vec4(color, 0.92);
        }
      `,
    });

    const blob = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, isMobile ? 32 : 64),
      blobMaterial
    );
    scene.add(blob);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 2),
      new THREE.MeshBasicMaterial({
        color: 0xff8a3d,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      })
    );
    scene.add(shell);

    /* particles */
    const particleCount = isMobile ? 220 : 550;
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 1.5;
      scales[i] = Math.random();
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: PALETTES.dark.particleAlpha },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aScale;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.4 + position.x * 2.0) * 0.25;
          p.x += cos(uTime * 0.3 + position.y * 1.5) * 0.2;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (aScale * 26.0 + 6.0) * uPixelRatio / -mv.z;
          vAlpha = 0.35 + 0.65 * aScale;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uAlpha;
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          float strength = smoothstep(0.5, 0.0, d);
          vec3 col = mix(vec3(1.0, 0.55, 0.24), vec3(1.0, 0.78, 0.5), vAlpha);
          gl_FragColor = vec4(col, strength * vAlpha * uAlpha);
        }
      `,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* — theme: react to device light/dark preference — */
    const lightQuery = window.matchMedia("(prefers-color-scheme: light)");
    function applyTheme() {
      const p = lightQuery.matches ? PALETTES.light : PALETTES.dark;
      blobUniforms.uColorDeep.value.set(p.deep);
      blobUniforms.uColorMid.value.set(p.mid);
      blobUniforms.uColorHot.value.set(p.hot);
      particleMat.uniforms.uAlpha.value = p.particleAlpha;
      shell.material.opacity = lightQuery.matches ? 0.12 : 0.07;
    }
    applyTheme();
    lightQuery.addEventListener("change", applyTheme);

    /* layout: blob right-of-centre on desktop, above headline on mobile */
    function layout() {
      if (window.innerWidth < 760) {
        blob.position.set(0, 1.15, -1.2);
        blob.scale.setScalar(0.72);
      } else {
        blob.position.set(2.45, 0.1, 0);
        blob.scale.setScalar(1);
      }
      shell.position.copy(blob.position);
      shell.scale.copy(blob.scale);
    }
    layout();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    const clock = new THREE.Clock();
    let raf = null;
    let disposed = false;

    function tick() {
      if (disposed) return;
      const t = clock.getElapsedTime();
      const scroll = Math.min(1, window.scrollY / window.innerHeight);

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      if (!reduced) {
        blobUniforms.uTime.value = t;
        particleMat.uniforms.uTime.value = t;
        blob.rotation.y = t * 0.12 + scroll * 2.4;
        blob.rotation.z = Math.sin(t * 0.1) * 0.15;
        shell.rotation.y = -t * 0.06;
        shell.rotation.x = t * 0.04;
        particles.rotation.y = t * 0.02;
      }

      blobUniforms.uAmp.value = 0.42 + scroll * 0.5;
      const fade = Math.max(0, 1 - scroll * 1.25);
      canvas.style.opacity = fade;

      camera.position.x = mouse.x * 0.45;
      camera.position.y = -mouse.y * 0.35 - scroll * 1.6;
      camera.lookAt(blob.position.x * 0.4, 0, 0);

      if (fade > 0) renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      layout();
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      lightQuery.removeEventListener("change", applyTheme);
      blob.geometry.dispose();
      blobMaterial.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webgl" ref={canvasRef} aria-hidden="true" />;
}
