title = "Yousef Store";

    console.warn("AppCache: caching failed or timed out, continuing without cache.");

}

// ===========================
// Load
// ===========================

document.addEventListener("DOMContentLoaded", function () {

    if (window.applicationCache) {

        var appCache = window.applicationCache;

        appCache.addEventListener("progress",    cacheProgress,       false);
        appCache.addEventListener("cached",      displayCacheComplete, false);
        appCache.addEventListener("updateready", displayCacheComplete, false);
        appCache.addEventListener("noupdate",    displayCacheComplete, false);
        appCache.addEventListener("error",       handleCacheError,    false);
        appCache.addEventListener("obsolete",    handleCacheError,    false);

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
