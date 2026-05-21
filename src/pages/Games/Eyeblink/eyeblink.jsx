import { useEffect, useRef, useState } from "react";

// ============== INTERACTIVE BACKGROUND ==============
const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#050816] via-[#0a0f2e] to-[#050816]">
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl"
        style={{
          left: "10%",
          top: "10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/25 to-pink-500/15 rounded-full blur-3xl"
        style={{
          right: "10%",
          bottom: "10%",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />
      
      <div
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl"
        style={{
          left: `${mousePos.x * 0.1}px`,
          top: `${mousePos.y * 0.1}px`,
          transition: "all 0.3s ease-out",
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gridGradient)" strokeWidth="1" />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
};

// ============== START MODAL ==============
const StartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1427] p-12 rounded-3xl border-2 border-cyan-500/50 shadow-2xl max-w-lg w-full mx-4 animate-scaleIn text-center">
        <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          👁️ EYE BLINK
        </h1>
        <p className="text-cyan-300 text-lg mb-8">Challenge</p>
        
        <div className="space-y-4 mb-10 text-left bg-black/30 p-6 rounded-2xl border border-cyan-500/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📹</span>
            <p className="text-gray-300">Allow camera access to play</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">👀</span>
            <p className="text-gray-300">Blink naturally to increase count</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <p className="text-gray-300">Real-time face detection</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-300">See how many times you blink</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-xl"
        >
          ▶️ START GAME
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Make sure camera permission is enabled
        </p>
      </div>
    </div>
  );
};

// ============== STATS PANEL ==============
const StatsPanel = ({ blinkCount, isBlinking, faceDetected }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#050816]/95 to-transparent backdrop-blur-md pt-4 pb-6 px-4">
      <div className="flex justify-center gap-6 max-w-3xl mx-auto flex-wrap">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#1a1f3a] to-[#0f1427] px-6 py-3 rounded-2xl border border-cyan-500/40 shadow-xl">
          <span className="text-3xl">👁️</span>
          <div>
            <p className="text-gray-400 text-xs">Total Blinks</p>
            <p className="text-2xl font-bold text-cyan-400">{blinkCount}</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border shadow-xl transition-all duration-300 ${
          isBlinking 
            ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/60' 
            : 'bg-gradient-to-r from-[#1a1f3a] to-[#0f1427] border-gray-500/40'
        }`}>
          <span className="text-3xl">{isBlinking ? '😴' : '👀'}</span>
          <div>
            <p className="text-gray-400 text-xs">Status</p>
            <p className={`text-lg font-bold ${isBlinking ? 'text-green-400' : 'text-yellow-400'}`}>
              {isBlinking ? 'BLINKING' : 'WATCHING'}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border shadow-xl transition-all duration-300 ${
          faceDetected 
            ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/60' 
            : 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/60'
        }`}>
          <span className="text-3xl">{faceDetected ? '✅' : '⚠️'}</span>
          <div>
            <p className="text-gray-400 text-xs">Face</p>
            <p className={`text-lg font-bold ${faceDetected ? 'text-blue-400' : 'text-red-400'}`}>
              {faceDetected ? 'FOUND' : 'NOT FOUND'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== MAIN GAME COMPONENT ==============
// ============== MAIN GAME COMPONENT ==============
const EyeBlink = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [blinkCount, setBlinkCount] = useState(0);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);

  const blinkStateRef = useRef(false);
  const animationRef = useRef(null);
  const modelsLoadedRef = useRef(false);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!gameStarted) return;

    const startGame = async () => {
      setIsLoading(true);
      setCameraError(null);

      try {
        await loadScriptsAndModels();

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user"
          },
          audio: false,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().then(resolve).catch(resolve);
            };
          });
        }

        setIsLoading(false);
        startDetection();
      } catch (error) {
        console.error("Initialization Error:", error);
        setCameraError(
          "Camera access denied or models failed to initialize. Please check permissions."
        );
        setIsLoading(false);
      }
    };

    const loadScriptsAndModels = async () => {
      if (modelsLoadedRef.current) return;

      if (!window.tf) {
        const tfScript = document.createElement("script");
        tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0";
        document.body.appendChild(tfScript);
        await new Promise((res) => (tfScript.onload = res));
      }

      if (!window.faceapi) {
        const faceApiScript = document.createElement("script");
        faceApiScript.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
        document.body.appendChild(faceApiScript);
        await new Promise((res) => (faceApiScript.onload = res));
      }

      // Using an ultra-stable github mirror repository for models weights
      const modelUrl = "https://justadudewhohacks.github.io/face-api.js/models/";
      await window.faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
      await window.faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);

      modelsLoadedRef.current = true;
    };

    const startDetection = () => {
      const detectFrame = async () => {
        if (!videoRef.current || !canvasRef.current) {
          animationRef.current = requestAnimationFrame(detectFrame);
          return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Make sure video is actually streaming data
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          try {
            // Clear and draw the raw webcam frame on canvas safely
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (modelsLoadedRef.current && window.faceapi) {
              const detections = await window.faceapi
                .detectAllFaces(canvas, new window.faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.4 }))
                .withFaceLandmarks();

              if (detections && detections.length > 0) {
                setFaceDetected(true);
                const landmarks = detections[0].landmarks;
                const positions = landmarks.positions;

                // Draw face mesh landmarks
                positions.forEach((point) => {
                  ctx.fillStyle = "#00FF88";
                  ctx.beginPath();
                  ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                  ctx.fill();
                });

                const leftEye = positions.slice(36, 42);
                const rightEye = positions.slice(42, 48);

                const getEAR = (eye) => {
                  const v1 = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
                  const v2 = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
                  const h = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
                  return (v1 + v2) / (2.0 * h);
                };

                const leftEAR = getEAR(leftEye);
                const rightEAR = getEAR(rightEye);
                const avgEAR = (leftEAR + rightEAR) / 2;

                const EAR_THRESHOLD = 0.23;

                if (avgEAR < EAR_THRESHOLD) {
                  setEyesClosed(true);
                  if (!blinkStateRef.current) {
                    setBlinkCount((prev) => prev + 1);
                    blinkStateRef.current = true;
                  }
                } else {
                  setEyesClosed(false);
                  blinkStateRef.current = false;
                }

                drawEyeCircle(ctx, leftEye, avgEAR < EAR_THRESHOLD);
                drawEyeCircle(ctx, rightEye, avgEAR < EAR_THRESHOLD);

                const box = detections[0].detection.box;
                ctx.strokeStyle = "#00FFFF";
                ctx.lineWidth = 2;
                ctx.strokeRect(box.x, box.y, box.width, box.height);
              } else {
                setFaceDetected(false);
              }
            }
          } catch (error) {
            console.error("Detection handling error:", error);
          }
        }

        animationRef.current = requestAnimationFrame(detectFrame);
      };

      animationRef.current = requestAnimationFrame(detectFrame);
    };

    const drawEyeCircle = (ctx, eyePoints, isClosed) => {
      const centerX = eyePoints.reduce((sum, p) => sum + p.x, 0) / eyePoints.length;
      const centerY = eyePoints.reduce((sum, p) => sum + p.y, 0) / eyePoints.length;

      ctx.fillStyle = isClosed ? "rgba(255, 0, 0, 0.6)" : "rgba(0, 255, 0, 0.4)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    startGame();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [gameStarted]);

  const resetGame = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setGameStarted(false);
    setBlinkCount(0);
    setEyesClosed(false);
    setFaceDetected(false);
    setCameraError(null);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <InteractiveBackground />
        <StartModal onStart={() => setGameStarted(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <InteractiveBackground />

      <StatsPanel blinkCount={blinkCount} isBlinking={eyesClosed} faceDetected={faceDetected} />

      <div className="flex-1 flex flex-col items-center justify-center pt-40 pb-8 w-full">
        <h1 className="text-4xl md:text-5xl font-black mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          👁️ Eye Blink Challenge
        </h1>

        {isLoading && (
          <div className="text-center mb-6 bg-black/40 p-8 rounded-2xl border border-cyan-500/40">
            <p className="text-cyan-300 font-semibold text-lg">⏳ Initializing webcam & models...</p>
          </div>
        )}

        {cameraError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-6 text-center max-w-md w-full">
            <p className="text-red-300 mb-4">{cameraError}</p>
            <button onClick={resetGame} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition-all">
              Back to Menu
            </button>
          </div>
        )}

        {!cameraError && !isLoading && (
          <>
            <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-2xl max-w-2xl w-full">
              <video ref={videoRef} className="hidden" playsInline muted width="640" height="480" />
              {/* Added CSS Transform transform scale-x-[-1] for native browser rendering mirror */}
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="w-full h-auto bg-black transform -scale-x-100" 
              />
              <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-cyan-500/10 to-transparent" />
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg text-gray-300 mb-2">
                {eyesClosed ? '😴 Eyes closed - blinking! 😴' : '👀 Eyes open - ready to blink! 👀'}
              </p>
              <p className="text-sm text-gray-400">
                {faceDetected ? 'Face detected ✓' : 'Position face clearly in front of camera'}
              </p>
            </div>
          </>
        )}

        <button
          onClick={resetGame}
          className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
};

export default EyeBlink;