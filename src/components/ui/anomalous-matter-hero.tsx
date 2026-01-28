import React, { useRef, useEffect, Suspense } from "react";

// Global window interface for singleton tracking
declare global {
  interface Window {
    __BRISTLETECH_THREE_JS__?: any;
    __BRISTLETECH_SCENE_MANAGER__?: ThreeJsSceneManager;
  }
}

// Module-level cache for Three.js (double insurance)
let threeJsModule: any = null;
let isLoadingThree = false;
let loadPromise: Promise<any> | null = null;

// Lazy load Three.js only once globally with promise caching
const loadThreeJS = async () => {
  // Return cached module if available
  if (window.__BRISTLETECH_THREE_JS__) {
    return window.__BRISTLETECH_THREE_JS__;
  }
  
  if (threeJsModule) {
    return threeJsModule;
  }
  
  // If already loading, return the same promise
  if (isLoadingThree && loadPromise) {
    return loadPromise;
  }
  
  // Start loading
  isLoadingThree = true;
  loadPromise = import("three").then(module => {
    threeJsModule = module;
    window.__BRISTLETECH_THREE_JS__ = module;
    isLoadingThree = false;
    return module;
  });
  
  return loadPromise;
};

// Singleton pattern to ensure only ONE Three.js scene exists globally
class ThreeJsSceneManager {
  private scene: any = null;
  private renderer: any = null;
  private camera: any = null;
  private mesh: any = null;
  private light: any = null;
  private animationId: number | null = null;
  private isInitialized = false;
  private mountElement: HTMLDivElement | null = null;
  private cleanupFunctions: Array<() => void> = [];

  private constructor() {}

  static getInstance(): ThreeJsSceneManager {
    // Use window-level reference to ensure singleton across module reloads
    if (!window.__BRISTLETECH_SCENE_MANAGER__) {
      window.__BRISTLETECH_SCENE_MANAGER__ = new ThreeJsSceneManager();
    }
    return window.__BRISTLETECH_SCENE_MANAGER__;
  }

  isSceneInitialized(): boolean {
    return this.isInitialized;
  }

  async initialize(mount: HTMLDivElement): Promise<void> {
    if (this.isInitialized || !mount) {
      return;
    }

    // Dynamically load Three.js
    const THREE = await loadThreeJS();
    if (!THREE) {
      console.error("Failed to load Three.js");
      return;
    }

    this.isInitialized = true;
    this.mountElement = mount;

    // Create scene
    this.scene = new THREE.Scene();

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 3;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(mount.clientWidth, mount.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(this.renderer.domElement);

    // Create geometry and material
    const geometry = new THREE.IcosahedronGeometry(1.2, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        color: { value: new THREE.Color("#818cf8") },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Perlin Noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
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
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
            vNormal = normal;
            vPosition = position;
            float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 pointLightPosition;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(pointLightPosition - vPosition);
            float diffuse = max(dot(normal, lightDir), 0.0);
            
            // Fresnel effect for the glow
            float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
            fresnel = pow(fresnel, 2.0);
            
            vec3 finalColor = color * diffuse + color * fresnel * 0.5;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }`,
      wireframe: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    // Create light
    this.light = new THREE.PointLight(0xffffff, 1, 100);
    this.light.position.set(0, 0, 5);
    this.scene.add(this.light);

    // Animation loop
    const animate = (t: number) => {
      if (!this.mesh || !this.renderer || !this.scene || !this.camera) return;
      
      this.mesh.material.uniforms.time.value = t * 0.0003;
      this.mesh.rotation.y += 0.0005;
      this.mesh.rotation.x += 0.0002;
      this.renderer.render(this.scene, this.camera);
      this.animationId = requestAnimationFrame(animate);
    };
    animate(0);

    // Event handlers
    const handleResize = () => {
      if (!this.camera || !this.renderer || !mount) return;
      this.camera.aspect = mount.clientWidth / mount.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.light || !this.camera || !THREE) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(x, y, 0.5).unproject(this.camera);
      const dir = vec.sub(this.camera.position).normalize();
      const dist = -this.camera.position.z / dir.z;
      const pos = this.camera.position.clone().add(dir.multiplyScalar(dist));
      this.light.position.copy(pos);
      if (this.mesh) {
        this.mesh.material.uniforms.pointLightPos.value = pos;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Store cleanup functions
    this.cleanupFunctions.push(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    });
  }

  dispose(): void {
    if (!this.isInitialized) return;

    // Cancel animation
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Execute cleanup functions
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];

    // Remove DOM element
    if (this.mountElement && this.renderer && this.renderer.domElement && this.mountElement.contains(this.renderer.domElement)) {
      try {
        this.mountElement.removeChild(this.renderer.domElement);
      } catch (e) {
        // Element already removed
      }
    }

    // Dispose Three.js resources
    if (this.mesh) {
      if (this.mesh.geometry && this.mesh.geometry.dispose) {
        this.mesh.geometry.dispose();
      }
      if (this.mesh.material && this.mesh.material.dispose) {
        this.mesh.material.dispose();
      }
    }

    if (this.renderer && this.renderer.dispose) {
      this.renderer.dispose();
    }

    // Clear references
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.mesh = null;
    this.light = null;
    this.mountElement = null;
    this.isInitialized = false;
  }
}

export function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const managerRef = useRef<ThreeJsSceneManager | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Get singleton instance from window
    const manager = ThreeJsSceneManager.getInstance();
    managerRef.current = manager;

    // Only initialize if not already initialized
    if (!manager.isSceneInitialized()) {
      manager.initialize(currentMount);
    }

    return () => {
      // Don't dispose on unmount to handle React Strict Mode
      // The singleton will persist across remounts
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

export function AnomalousMatterHero({
  title = "Observation Log: Anomaly 7",
  subtitle = "Matter in a state of constant, beautiful flux.",
  description = "A new form of digital existence has been observed. It responds to stimuli, changes form, and exudes an unknown energy. Further study is required.",
}) {
  return (
    <section
      role="banner"
      className="relative w-full h-screen bg-slate-950 text-white overflow-hidden"
    >
      <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
        <GenerativeArtScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-20 md:pb-32 text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-sm tracking-widest text-indigo-300 uppercase">
            {title}
          </h1>
          <p className="mt-4 text-3xl md:text-5xl leading-tight">
            {subtitle}
          </p>
          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
