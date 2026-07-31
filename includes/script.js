let timerId = null;

const label = document.getElementById("autoJbLabel");
const checkbox = document.getElementById("autoJbInput");
const jeilbrekBtn = document.getElementById("jeilbrek");

const progressBar = document.getElementById("progress-bar");
const statusBox = document.getElementById("status");
const consoleBox = document.getElementById("console");

const storedAutoJb = localStorage.getItem("autoJb");
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// Selected exploit
var exploitChain = localStorage.getItem("exploitChain") || "lapse";

const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById("kernel-options");

// Show User Agent

// Change exploit
kexForm.addEventListener("change", function (event) {
    exploitChain = event.target.value;
    localStorage.setItem("exploitChain", exploitChain);
});

// ===========================
// Console
// ===========================

function log(message) {

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0") +
        ":" +
        now.getSeconds().toString().padStart(2, "0");

    consoleBox.textContent += `\n[${time}] ${message}`;

    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// ===========================
// Progress
// ===========================

function setProgress(percent, text) {

    if (progressBar)
        progressBar.style.width = percent + "%";

    if (statusBox)
        statusBox.innerText = text;
}

// ===========================
// Launch
// ===========================

jeilbrekBtn.addEventListener("click", function () {

    jeilbrekBtn.disabled = true;

    stopInterval();

    startUI();

});

function startUI() {

    consoleBox.textContent = "";

    log("Initializing...");

    setProgress(10, "Initializing");

    setTimeout(() => {

        log("Checking firmware...");

        setProgress(25, "Checking Firmware");

    }, 500);

    setTimeout(() => {

        log("Preparing exploit...");

        setProgress(45, "Preparing");

    }, 1000);

    setTimeout(() => {

        log("Loading payload...");

        setProgress(65, "Loading");

    }, 1600);

    setTimeout(() => {

        log("Launching exploit...");

        setProgress(90, "Executing");

    }, 2200);

    setTimeout(() => {

        log("Execution started.");

        setProgress(100, "Running");

        doJb();

    }, 2800);

}

// ===========================
// Auto JB
// ===========================

checkbox.addEventListener("change", function () {

    localStorage.setItem("autoJb", checkbox.checked);

    if (checkbox.checked && !jeilbrekBtn.disabled) {

        jailbreakCountdown();

        return;

    }

    stopInterval();

});

function stopInterval() {

    if (timerId !== null) {

        clearInterval(timerId);

        timerId = null;

    }

    label.textContent = "Auto Jailbreak";

}

function jailbreakCountdown() {

    stopInterval();

    let countdown = 5;

    label.textContent = `Auto Jailbreaking in: ${countdown}`;

    timerId = setInterval(() => {

        countdown--;

        label.textContent =
            `Auto Jailbreaking in: ${countdown}`;

        if (countdown < 0) {

            clearInterval(timerId);

            timerId = null;

            label.textContent = "Executing";

            jeilbrekBtn.disabled = true;

            startUI();

        }

    }, 1000);

}

// ===========================
// Cache
// ===========================

function cacheProgress(e) {

    var percent = Math.round(e.loaded / e.total * 100);

    document.title = "Caching " + percent + "%";

}

function displayCacheProgress() {

    document.title = "✓ Cached";

    setTimeout(() => {

        document.title = "Yousef Store";

    }, 2500);

}

// ===========================
// Load
// ===========================

document.addEventListener("DOMContentLoaded", function () {

    if (window.applicationCache) {

        window.applicationCache.addEventListener(
            "progress",
            cacheProgress,
            false
        );

        window.applicationCache.oncached = displayCacheProgress;

        window.applicationCache.onupdateready = displayCacheProgress;

    }

    if (exploitChain === "netctrl")
        netctrlRadio.checked = true;
    else
        lapseRadio.checked = true;

    checkbox.checked = autoJbValue;

    setProgress(0, "Ready");

    consoleBox.textContent =
`=========================================
Yousef Store PS4 Host
=========================================

Ready.
Awaiting execution...`;

    if (autoJbValue)
        jailbreakCountdown();

});