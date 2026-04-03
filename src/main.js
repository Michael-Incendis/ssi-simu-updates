let currentScenarioId = null;
let scenarioTimer = null;

let scenario1AlarmStopped = false;
let scenario2AlarmStopped = false;
let scenario3AlarmStopped = false;

let restrictedAlarmAudio = null;
let validationAudio = null;

function initAudio() {
  restrictedAlarmAudio = new Audio("/src/assets/sounds/alarme-restreinte.mp3");
  restrictedAlarmAudio.loop = true;

  validationAudio = new Audio("/src/assets/sounds/bip-validation.mp3");
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
}

function stopAlarm() {
  if (restrictedAlarmAudio) {
    restrictedAlarmAudio.pause();
    restrictedAlarmAudio.currentTime = 0;
  }
}

function showGreenLeds() {
  document.getElementById("greenTop")?.classList.remove("hidden");
  document.getElementById("greenMid")?.classList.remove("hidden");
  document.getElementById("greenBottom")?.classList.remove("hidden");
}

function hideOrangeLeds() {
  document.getElementById("orangeTop")?.classList.add("hidden");
  document.getElementById("orangeMid")?.classList.add("hidden");
  document.getElementById("orangeZone")?.classList.add("hidden");
  document.getElementById("orangeExtra")?.classList.add("hidden");
  document.getElementById("orangeMotor")?.classList.add("hidden");

  document.getElementById("orangeTop")?.classList.remove("blink");
  document.getElementById("orangeMid")?.classList.remove("blink");
  document.getElementById("orangeZone")?.classList.remove("blink");
  document.getElementById("orangeExtra")?.classList.remove("blink");
  document.getElementById("orangeMotor")?.classList.remove("blink");
}

function resetScenario() {
  stopAlarm();

  scenario1AlarmStopped = false;
  scenario2AlarmStopped = false;
  scenario3AlarmStopped = false;

  if (scenarioTimer) {
    clearTimeout(scenarioTimer);
    scenarioTimer = null;
  }

  const messageBox = document.getElementById("ssiMessageBox");
  if (messageBox) {
    messageBox.classList.add("hidden");
    messageBox.innerText = "";
  }

  hideOrangeLeds();
  showGreenLeds();
}

function showOrangeScenario1() {
  hideOrangeLeds();

  document.getElementById("orangeTop")?.classList.remove("hidden");
  document.getElementById("orangeMid")?.classList.remove("hidden");
  document.getElementById("orangeZone")?.classList.remove("hidden");

  document.getElementById("orangeTop")?.classList.add("blink");
  document.getElementById("orangeMid")?.classList.add("blink");
  document.getElementById("orangeZone")?.classList.add("blink");
}

function showOrangeScenario2() {
  hideOrangeLeds();

  document.getElementById("orangeTop")?.classList.remove("hidden");
  document.getElementById("orangeMid")?.classList.remove("hidden");
  document.getElementById("orangeMotor")?.classList.remove("hidden");

  document.getElementById("orangeTop")?.classList.add("blink");
  document.getElementById("orangeMid")?.classList.add("blink");
  document.getElementById("orangeMotor")?.classList.add("blink");
}

function showOrangeScenario3() {
  hideOrangeLeds();

  document.getElementById("orangeTop")?.classList.remove("hidden");
  document.getElementById("orangeMid")?.classList.remove("hidden");
  document.getElementById("orangeZone")?.classList.remove("hidden");
  document.getElementById("orangeExtra")?.classList.remove("hidden");
}

function showMenu() {
  hideAllScreens();
  document.getElementById("menuScreen")?.classList.add("active");
}

function showSSIA() {
  hideAllScreens();
  document.getElementById("ssiAScreen")?.classList.add("active");
}

function showA1ScenarioMenu() {
  hideAllScreens();
  document.getElementById("a1ScenarioMenuScreen")?.classList.add("active");
}

function openA1Scenario(name) {
  hideAllScreens();
  document.getElementById("ssiA1Screen")?.classList.add("active");

  resetScenario();

  if (name.includes("Scénario 1")) {
    currentScenarioId = "S1";
    scenarioTimer = setTimeout(triggerScenario1, 5000);
  } else if (name.includes("Scénario 2")) {
    currentScenarioId = "S2";
    scenarioTimer = setTimeout(triggerScenario2, 5000);
  } else if (name.includes("Scénario 3")) {
    currentScenarioId = "S3";
    scenarioTimer = setTimeout(triggerScenario3, 5000);
  } else {
    currentScenarioId = null;
  }
}

function triggerScenario1() {
  if (currentScenarioId !== "S1") return;

  const messageBox = document.getElementById("ssiMessageBox");
  if (messageBox) {
    messageBox.innerText = "ZC 01 PCF 1.02";
    messageBox.classList.remove("hidden");
  }

  showOrangeScenario1();
  restrictedAlarmAudio?.play().catch(() => {});
}

function triggerScenario2() {
  if (currentScenarioId !== "S2") return;

  const messageBox = document.getElementById("ssiMessageBox");
  if (messageBox) {
    messageBox.innerText = "ZC 04 R + 2";
    messageBox.classList.remove("hidden");
  }

  showOrangeScenario2();
  restrictedAlarmAudio?.play().catch(() => {});
}

function triggerScenario3() {
  if (currentScenarioId !== "S3") return;

  const messageBox = document.getElementById("ssiMessageBox");
  if (messageBox) {
    messageBox.innerText = "Défaut alarme générale";
    messageBox.classList.remove("hidden");
  }

  showOrangeScenario3();
  restrictedAlarmAudio?.play().catch(() => {});
}

function handleStopSignalSonore() {
  if (currentScenarioId === "S1") scenario1AlarmStopped = true;
  if (currentScenarioId === "S2") scenario2AlarmStopped = true;
  if (currentScenarioId === "S3") scenario3AlarmStopped = true;

  stopAlarm();
  validationAudio?.play().catch(() => {});
}

function handleDoorClick() {
  if (currentScenarioId === "S1") {
    if (!scenario1AlarmStopped) {
      alert("Vous devez d'abord acquitter l'alarme.");
      return;
    }
    finishScenario();
  }
}

function handleTechnicienClick() {
  if (currentScenarioId === "S2") {
    if (!scenario2AlarmStopped) {
      alert("Vous devez d'abord acquitter l'alarme.");
      return;
    }
    finishScenario();
    return;
  }

  if (currentScenarioId === "S3") {
    if (!scenario3AlarmStopped) {
      alert("Vous devez d'abord acquitter l'alarme.");
      return;
    }
    finishScenario();
  }
}

function finishScenario() {
  const messageBox = document.getElementById("ssiMessageBox");
  if (messageBox) {
    messageBox.classList.add("hidden");
    messageBox.innerText = "";
  }

  hideOrangeLeds();
  showGreenLeds();

  validationAudio?.play().catch(() => {});
}

function handleKey() {
  console.log("Réarmement effectué");
}

function handleMute() {
  stopAlarm();
  console.log("Alarme coupée");
}

window.showMenu = showMenu;
window.showSSIA = showSSIA;
window.showA1ScenarioMenu = showA1ScenarioMenu;
window.openA1Scenario = openA1Scenario;
window.handleStopSignalSonore = handleStopSignalSonore;
window.handleDoorClick = handleDoorClick;
window.handleTechnicienClick = handleTechnicienClick;
window.handleKey = handleKey;
window.handleMute = handleMute;

window.addEventListener("DOMContentLoaded", initAudio);