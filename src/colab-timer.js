let startTime;
let timeout;
function updateTimer(el) {
  const a = (i) => (i < 10 ? "0" + i : i);
  const b = (x) => Math.floor(x);
  let c = b(Date.now() / 1000) - startTime;
  h = a(b(c / 3600));
  m = a(b((c / 60) % 60));
  s = a(b(c % 60));
  // console.log(h,m,s)

  // show different text betwen 4:58 and 5:15
  if (c > 298 && c < 315) {
    el.innerText =
      "Обычно в это время вылазит капча, проверь вкладку колаба (" +
      h +
      ":" +
      m +
      ":" +
      s +
      ")";
  } else {
    el.innerText = h + ":" + m + ":" + s;
  }

  //refresh timer every 30 seconds
  if (c % 30 == 0) {
    refreshTimer(el, true);
    return;
  }

  timeout = setTimeout(() => updateTimer(el), 1000);
}

refreshTimer = (timerEl, notext = false) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  if (!notext) timerEl.innerText = "подключение...";
  fetch("file=static/launch.txt", { cache: "no-store" })
    .then((response) => {
      if (response.status == 404) {
        timerEl.innerText = "Ошибка: колаб выключился!";
        return;
      }
      response.text().then((text) => {
        startTime = parseInt(text);
        updateTimer(timerEl);
      });
    })
    .catch((err) => {
      console.log(err);
      timerEl.innerText = "Ошибка. "+err;
    });
};

onUiLoaded(function () {
  const quickSettings = gradioApp().querySelector("#quicksettings");

  if (gradioApp().querySelector("#colab-timer") != null) return;
  let mainDiv = document.createElement("div");
  mainDiv.id = "colab-timer";
  mainDiv.className = "flex justify-start";
  mainDiv.style = "cursor: pointer; user-select: none; margin-top: 9px;";
  mainDiv.onclick = () => refreshTimer(timerEl);

  let div2 = document.createElement("div");
  div2.className = "flex gap-2 items-center border-solid border gr-box";
  div2.style =
    "padding-block: 3px; width: fit-content; scale: 0.8; margin-top: -20px; transform-origin: left center; padding-inline: 5px; border-color: orange; position: absolute; background-color: transparent !important; z-index: 999;";
  div2.title = "таймер работы колаба: нажми чтобы обновить";

  let img = document.createElement("img");
  img.src =
    "https://github.com/PR0LAPSE/StableDiffusionWebUIColab/raw/main/src/colab.svg";
  img.width = 24;

  let timerEl = document.createElement("div");
  timerEl.style = "font-family: monospace;color: orange;";
  timerEl.innerText = "соединение...";
  div2.appendChild(img);
  div2.appendChild(timerEl);
  mainDiv.appendChild(div2);
  quickSettings.parentNode.insertBefore(mainDiv, quickSettings.nextSibling);

  refreshTimer(timerEl);
});
