// Add this to your JavaScript code
function setAnimationSpeed(speed = -1.0) {
    if (typeof CWASA !== 'undefined') {
        CWASA.setSpeed(speed);
    }
}

// Function to ensure proper speed is maintained throughout playback
function ensureProperSpeed() {
    let currentSpeed = -1.0;  // log2(-1) speed
    
    // Check speed periodically
    setInterval(() => {
        if (typeof CWASA !== 'undefined') {
            let avatarSpeed = CWASA.getSpeed();
            if (avatarSpeed !== currentSpeed) {
                console.log("Correcting animation speed");
                CWASA.setSpeed(currentSpeed);
            }
        }
    }, 1000);
}

// Call this when page loads
window.addEventListener('load', ensureProperSpeed);