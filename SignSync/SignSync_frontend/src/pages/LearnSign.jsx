import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Settings,
  Info,
  RefreshCw,
  User,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Importing animations and models
import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";
import xbot from "../Models/xbot/xbot.glb";
import ybot from "../Models/ybot/ybot.glb";

const LearnSign = () => {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [activeCategory, setActiveCategory] = useState("alphabets");
  const [searchTerm, setSearchTerm] = useState("");
  const [modelColor, setModelColor] = useState("#6366f1"); // Default color

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    // Initialize some ref variables
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    // Create scene
    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf8fafc);

    // Lighting
    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(0, 2, 5);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    ref.scene.add(spotLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
    frontLight.position.set(0, 2, 5);
    ref.scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 3, -5);
    ref.scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    ref.scene.add(ambientLight);

    // Camera
    ref.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
    ref.camera.position.z = 2.2;
    ref.camera.position.y = 1.2;
    ref.camera.lookAt(0, 0.9, 0);

    // Renderer
    ref.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    ref.renderer.shadowMap.enabled = true;
    ref.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    ref.renderer.outputEncoding = THREE.sRGBEncoding;
    ref.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    ref.renderer.toneMappingExposure = 1.0;

    // Attach renderer to container and size it to that container
    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.innerHTML = "";
      canvasContainer.appendChild(ref.renderer.domElement);
      // Measure the container and set renderer size accordingly
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
      ref.renderer.setSize(width, height);
      ref.camera.aspect = width / height;
      ref.camera.updateProjectionMatrix();
    }

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    ref.scene.add(floor);

    // Resize handling
    const handleResize = () => {
      const container = document.getElementById("canvas-container");
      if (container) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        ref.camera.aspect = w / h;
        ref.camera.updateProjectionMatrix();
        ref.renderer.setSize(w, h);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (ref.renderer && ref.scene && ref.camera) {
        // Subtle breathing/idle movement if no animations
        if (ref.avatar && ref.animations.length === 0 && !ref.pending) {
          const time = Date.now() * 0.001;
          ref.avatar.position.y += Math.sin(time * 0.5) * 0.005;
          ref.avatar.rotation.y = Math.sin(time * 0.2) * 0.05;
        }
        ref.renderer.render(ref.scene, ref.camera);
      }
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ref.renderer) {
        ref.renderer.dispose();
      }
    };
  }, []);

  // Load model whenever bot or modelColor changes
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === "SkinnedMesh") {
            child.frustumCulled = false;
            child.castShadow = true;
            child.receiveShadow = true;
            // Apply color
            if (child.material) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(modelColor),
                roughness: 0.5,
                metalness: 0.3,
                skinning: true,
              });
            }
          }
        });
        if (ref.avatar) {
          ref.scene.remove(ref.avatar);
        }
        ref.avatar = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(ref.avatar);
        const center = box.getCenter(new THREE.Vector3());
        ref.avatar.position.x = -center.x;
        ref.avatar.position.y = -center.y;
        ref.avatar.position.y += box.min.y < 0 ? Math.abs(box.min.y) : 0;
        ref.avatar.position.z = -center.z;

        ref.scene.add(ref.avatar);
        defaultPose(ref);
        ref.renderer.render(ref.scene, ref.camera);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  }, [bot, modelColor]);

  // Update model color in case the user changes it after the avatar is loaded
  useEffect(() => {
    if (ref.avatar) {
      ref.avatar.traverse((child) => {
        if (child.type === "SkinnedMesh" && child.material) {
          child.material.color.set(modelColor);
        }
      });
    }
  }, [modelColor]);

  // The main animation routine (applied to ref.animations)
  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }

    ref.pending = true;
    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length; ) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          const bone = ref.avatar.getObjectByName(boneName);
          if (!bone) {
            ref.animations[0].splice(i, 1);
            continue;
          }
          if (sign === "+" && bone[action][axis] < limit) {
            const delta = Math.min(speed, (limit - bone[action][axis]) * 0.1);
            bone[action][axis] += delta;
            bone[action][axis] = Math.min(bone[action][axis], limit);
            i++;
          } else if (sign === "-" && bone[action][axis] > limit) {
            const delta = Math.min(speed, (bone[action][axis] - limit) * 0.1);
            bone[action][axis] -= delta;
            bone[action][axis] = Math.max(bone[action][axis], limit);
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }

    ref.renderer.render(ref.scene, ref.camera);
  };

  // Clear existing animations and run new animation
  const runAnimation = (item, type) => {
    // 1) Clear existing so we always start fresh
    ref.animations = [];

    // 2) Push new instructions from alphabets/words modules
    if (type === "alphabet") {
      alphabets[item](ref);
    } else {
      words[item](ref);
    }

    // 3) If not currently animating, start the animation loop
    if (!ref.pending) {
      ref.pending = true;
      requestAnimationFrame(ref.animate);
    }
  };

  // Filter items
  const getFilteredItems = (category) => {
    if (category === "alphabets") {
      const alphabetsList = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(i + 65)
      );
      if (!searchTerm) return alphabetsList;
      return alphabetsList.filter((letter) =>
        letter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      if (!searchTerm) return words.wordList;
      return words.wordList.filter((word) =>
        word.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // Predefined color schemes
  const colorSchemes = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Slate", value: "#64748b" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold">Learn Sign Language</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10">
                <Info className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search signs..."
                    className="w-full py-2 px-4 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 01-14 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex border-b border-slate-200">
                <button
                  className={`flex-1 py-3 font-medium text-sm ${
                    activeCategory === "alphabets"
                      ? "text-purple-600 border-b-2 border-purple-500"
                      : "text-slate-600"
                  }`}
                  onClick={() => setActiveCategory("alphabets")}
                >
                  Alphabets
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-sm ${
                    activeCategory === "words"
                      ? "text-purple-600 border-b-2 border-purple-500"
                      : "text-slate-600"
                  }`}
                  onClick={() => setActiveCategory("words")}
                >
                  Words
                </button>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                  {getFilteredItems(activeCategory).map((item) => (
                    <button
                      key={item}
                      className="py-3 px-4 text-center rounded-lg border border-slate-200 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                      onClick={() =>
                        runAnimation(
                          item,
                          activeCategory === "alphabets" ? "alphabet" : "word"
                        )
                      }
                    >
                      <span className="font-medium text-slate-700">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content - 3D viewer */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">
                  Sign Language Visualization
                </h2>
                <button
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
                  onClick={() => {
                    if (ref.avatar) {
                      defaultPose(ref);
                    }
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Pose
                </button>
              </div>
              {/* Here is the "box" for the model, fixed height ~ half screen if you like */}
              <div
                id="canvas-container"
                className="w-full h-[500px] bg-gradient-to-b from-slate-50 to-slate-100"
              />
              <div className="p-4 border-t border-slate-200">
                <div className="text-center text-sm text-slate-500">
                  Use the controls on the right to adjust animation settings
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar - Settings */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center">
                <Settings className="h-5 w-5 text-slate-700 mr-2" />
                <h2 className="font-semibold text-slate-800">
                  Animation Settings
                </h2>
              </div>

              <div className="p-4 space-y-6">
                {/* Avatar selection */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Select Avatar
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBot(xbot)}
                      className={`p-2 rounded-lg border ${
                        bot === xbot
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200"
                      } transition-colors`}
                    >
                      <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center mb-2">
                        <User className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="text-sm font-medium text-center">
                        Avatar 1
                      </div>
                    </button>
                    <button
                      onClick={() => setBot(ybot)}
                      className={`p-2 rounded-lg border ${
                        bot === ybot
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200"
                      } transition-colors`}
                    >
                      <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center mb-2">
                        <User className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="text-sm font-medium text-center">
                        Avatar 2
                      </div>
                    </button>
                  </div>
                </div>

                {/* Color selection */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Avatar Color
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colorSchemes.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setModelColor(color.value)}
                        className={`w-full aspect-square rounded-full border-2 transition-all ${
                          modelColor === color.value
                            ? "border-slate-800 scale-110"
                            : "border-slate-200"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center">
                    <Palette className="h-4 w-4 text-slate-500 mr-2" />
                    <label className="text-xs text-slate-500">Custom color:</label>
                    <input
                      type="color"
                      value={modelColor}
                      onChange={(e) => setModelColor(e.target.value)}
                      className="ml-2 w-6 h-6 p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Animation speed */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-slate-700">
                      Animation Speed
                    </h3>
                    <span className="text-sm text-slate-500">
                      {speed.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.50"
                    step="0.01"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>

                {/* Pause time */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-slate-700">
                      Pause Duration
                    </h3>
                    <span className="text-sm text-slate-500">{pause} ms</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={pause}
                    onChange={(e) => setPause(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>None</span>
                    <span>2 sec</span>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="p-4 bg-purple-50 border-t border-purple-100">
                <h3 className="text-sm font-medium text-purple-800 mb-2">
                  Learning Tips
                </h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Practice each sign multiple times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pay attention to hand positioning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use the slower speed for detailed learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnSign;
