function displayModal() {

  const modal = document.querySelector('.modal');
  if (!modal) {

    const div = document.createElement('div');
    div.classList.add('modal');

    const video = document.createElement('video');
    video.classList.add('scrimmer');
    video.setAttribute('src', 'https://files.catbox.moe/4n01sr.mp4');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('controls', 'false');

    const button = document.createElement('button');
    button.classList.add('cross');
    button.innerText = 'X';
    button.addEventListener('click', () => {
      document.body.removeChild(div);
    });

    div.appendChild(video);
    div.appendChild(button);

    document.body.appendChild(div);
    setTimeout(function() {
      document.body.removeChild(div);
      modalDisplayed = false;
    }, 4000);
  }
}


setInterval(displayModal, 1800000);


const modalStyle = `
<style>
.scrimmer,
modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  left: 0px;
  top: 0px;
  z-index: 999;
  text-align: center;
  background: #dc0000;
}
.cross {
  background: black;
  color:white;
  filter: opacity(0.5);
  z-index: 999;
  position: absolute;
  top:0;
  right:0;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyle);