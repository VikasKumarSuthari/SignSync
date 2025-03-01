import React, { useEffect, useState, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const ModelPage = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cwasaLoaded, setCwasaLoaded] = useState(false);
    const [avatarReady, setAvatarReady] = useState(false);
    const [islText, setIslText] = useState("");

    // Speech Recognition
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-700">
                <p className="text-lg font-semibold">Browser Support Error</p>
                <p className="mt-2">Your browser doesn't support speech recognition functionality.</p>
            </div>
        );
    }

    const sendTranscript = async () => {
        if (!transcript) return;
        try {
            console.log("Sending transcript:", transcript);
            await axios.post("http://127.0.0.1:5000/ChangeSentenceFunction", transcript, {
                headers: { "Content-Type": "text/plain" }
            });

            const response = await axios.get("http://127.0.0.1:5000/isl_gloss");
            console.log("Server Response:", response.data);
            setIslText(response.data.isl);

            const videoResponse = await axios.get("http://127.0.0.1:5000/videos");
            console.log("Updated SiGML file URLs:", videoResponse.data.links);
            setVideoLinks(videoResponse.data.links || []);
            restartPlayback(videoResponse.data.links);
        } catch (error) {
            console.error("Error sending transcript:", error);
            alert("Error sending transcript. Check the console for details.");
        }
    };

    // Load CWASA script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./allcsa.js";
        script.async = true;
        script.onload = () => {
            console.log("CWASA script loaded successfully");
            setCwasaLoaded(true);
        };
        script.onerror = (e) => {
            console.error("Failed to load CWASA script:", e);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Initialize CWASA
    useEffect(() => {
        if (cwasaLoaded && window.CWASA) {
            console.log("Initializing CWASA...");
            try {
                window.CWASA.init({
                    useClientConfig: false,
                    avSettings: [
                        {
                            width: 400,
                            height: 400,
                            initAv: "marc",
                            initSiGMLURL:`${window.location.origin}/static/signs/sign.sigml`,
                            initSpeed: 1.0,
                            rateSpeed: 5,
                        },
                    ],
                });

                window.CWASA.addHook("avatarready", () => {
                    setAvatarReady(true);
                    if (videoLinks.length > 0) {
                        console.log("Avatar ready. Starting playback with:", videoLinks[0]);
                        window.CWASA.playSiGMLURL(videoLinks[0]);
                        setCurrentIndex(1);
                    } else {
                        console.log("Avatar ready but no SiGML files available yet.");
                    }
                });

                window.CWASA.addHook("animationcomplete", () => {
                    console.log("Animation complete event triggered");
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                });

                console.log("CWASA initialization complete");
            } catch (error) {
                console.error("Error during CWASA initialization:", error);
            }
        }
    }, [cwasaLoaded]);

    // Restart playback
    const restartPlayback = async(newVideoLinks) => {
        console.log("restart playback function called");
        setCurrentIndex(0);
        if (newVideoLinks.length > 0) {
            console.log("Restarting playback with:", newVideoLinks[0]);
            if (window.CWASA && typeof window.CWASA.playSiGMLURL === "function") {
                console.log(newVideoLinks[0]);
                await window.CWASA.playSiGMLURL(newVideoLinks[0]);
                console.log("restart playback done");
            } else {
                console.error("CWASA is not available or playSiGMLURL is not a function");
            }
        } else {
            console.log("No SiGML files available for playback.");
        }
    };

    // Play next SiGML
    const playNextSiGML = useCallback(() => {
        if (currentIndex >= videoLinks.length) {
            console.log("All animations completed");
            return;
        }

        try {
            const url = videoLinks[currentIndex];
            if (!url) {
                console.error("Invalid URL at index", currentIndex);
                setCurrentIndex((prevIndex) => prevIndex + 1);
                return;
            }

            if (window.CWASA && typeof window.CWASA.playSiGMLURL === "function") {
                console.log(`Playing SiGML file ${currentIndex + 1}/${videoLinks.length}: ${url}`);
                window.CWASA.playSiGMLURL(url);
            } else {
                console.error("CWASA or playSiGMLURL not available", window.CWASA);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        } catch (error) {
            console.error("Error playing SiGML:", error);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }, [currentIndex, videoLinks]);

    // Call playNextSigml when videoLinks and avatarReady are true
    useEffect(() => {
        if (videoLinks && videoLinks.length > 0 && avatarReady) {
            console.log("VideoLinks updated, starting animation sequence", videoLinks);
            setCurrentIndex(0);
            playNextSiGML();
        }
    }, [videoLinks, avatarReady]);

    return (
        <div className="flex h-screen p-6 bg-gray-100">
            {/* Speech Recognition Section */}
            <div className="w-1/3 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <button onClick={() => SpeechRecognition.startListening({ continuous: true })}
                            className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-400">
                            Start
                        </button>
                        <button onClick={() => { SpeechRecognition.stopListening(); sendTranscript(); }}
                            className="bg-slate-200 px-4 py-2 rounded-md shadow-sm hover:bg-slate-300">
                            Stop
                        </button>
                        <button onClick={resetTranscript}
                            className="border px-4 py-2 rounded-md shadow-sm hover:bg-slate-50">
                            Reset
                        </button>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[100px]">
                    <p className="text-sm font-medium text-slate-500 mb-2">Transcript</p>
                    <p className="text-slate-700">{transcript || "Start speaking to see your words appear here..."}</p>
                </div>
                {islText && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 min-h-[100px]">
                        <p className="text-sm font-medium text-purple-500 mb-2">ISL Gloss</p>
                        <p className="text-slate-700">{islText}</p>
                    </div>
                )}
            </div>

            {/* Avatar Section */}
            <div className="flex justify-center flex-1">
                <div className="CWASAPanel av0"></div>
            </div>
        </div>
    );
};

export default ModelPage;