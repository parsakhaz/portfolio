const toggleNav = () => {
  document.body.dataset.nav =
    document.body.dataset.nav === 'true' ? 'false' : 'true';
};

const track = document.getElementById('image-track');

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = '0';
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === '0') return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -80, // 75% is the max when image-track is 15% from the left, 100% is max when image-track is 50% from the left
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -80); // 75% is the max when image-track is 15% from the left, 100% is max when image-track is 50% from the left

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  for (const image of track.getElementsByClassName('content')) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// typing effect code here

async function typeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split('');
  const element = document.getElementById(eleRef);
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    console.log(element);
    element.innerHTML += letters[i];
    i++;
  }
  return;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = () => {
  typeSentence("Hi, I'm Parsa, and this is my studio.", 'sentence').then(() => {
    typeSentence('Start learning more about me...', 'sentence-2').then(() => {
      typeSentence('drag to scroll', 'drag-to-scroll').then(() => {
        // document.getElementById('cursor').style.visibility = 'visible';
      });
    });
  });
};
