let startTime;
let timeout;
function updateTimer(el) {
  const a = (i) => (i < 10 ? "0" + i : i);
  const b = (x) => Math.floor(x);
  let c = b(Date.now() / 1000) - startTime;
  h = a(b(c / 3600));
  m = a(b((c / 60) % 60));
  s = a(b(c % 60));
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
  //обновление таймера каждые 30 сек
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
  const insertionPosition = document.querySelector("body > gradio-app").shadowRoot.querySelector("div.gradio-container.dark");
  if (gradioApp().querySelector("#colab-timer") != null) return;
  let mainDiv = document.createElement("div");
  mainDiv.id = "colab-timer";
  mainDiv.style = "cursor:pointer;user-select:none;display:flex!important;cursor:pointer!important;position:absolute!important;background-color:transparent!important;right:.7em;top:.2em;justify-content:center;width:110px;height:26px;flex-direction:row;align-content:center;align-items:center;font-family:monospace!important;";
  mainDiv.onclick = () => refreshTimer(timerEl);
  let div2 = document.createElement("div");
  div2.className = "timer";
  div2.style = "cursor:pointer;user-select:none;display:flex!important;cursor:pointer!important;position:absolute!important;background-color:transparent!important;right:.7em;top:.2em;justify-content:center;width:110px;height:26px;flex-direction:row;align-content:center;align-items:center;font-family:monospace!important;";
  div2.title = "таймер работы колаба: нажми чтобы обновить";
  let img = document.createElement("img");
  img.id = "colab_logo";
  img.src =
    "https://github.com/PR0LAPSE/StableDiffusionWebUIColab/raw/main/src/colab.svg";
  img.width = 24;
  let timerEl = document.createElement("div");
  timerEl.id = "timer_time";
  timerEl.innerText = "соединение...";
  timerEl.style = "font-family:monospace!important;color:#ff9f00;margin-left:.3em";
  div2.appendChild(img);
  div2.appendChild(timerEl);
  mainDiv.appendChild(div2);
  insertionPosition.parentNode.insertBefore(mainDiv, insertionPosition.nextSibling);
  refreshTimer(timerEl);
});