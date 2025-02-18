let element = document.querySelector(".textb");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
const mic = document.querySelector(".mp");
const stop = document.querySelector(".stop");
const copy = document.querySelector(".copy");
const clear = document.querySelector(".clear");
const lang = document.getElementById("languages");

copy.addEventListener("click", () => {

    navigator.clipboard.writeText(element.value).then(() => {
        alert("Text copied to clipboard");
    }).catch((error) => {
        console.log("copy failed: " + error)
    })
});


mic.addEventListener("click", () => {
    if (recognition && lang) {
        recognition.lang = lang.value || "en-IN";
        recognition.start();
    }
    else {
        console.log("Error in recognition or language");
    }
});
stop.addEventListener("click", () => { recognition.stop(); });

recognition.onresult = (event) => {
    let transcript = "";
    for (const result of event.results) {
        transcript += result[0].transcript + " ";
    }
    element.value += transcript;
};
recognition.onerror = (event) => {
    console.log("Error occurred in recognition: " + event.error);
}
clear.addEventListener("click", () => {
    element.value = "";
})