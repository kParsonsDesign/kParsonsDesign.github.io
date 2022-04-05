window.onload = () => {
  // onload allows images to be loaded and
  // refreshes bounding edges on window resize

  // svg card element for onhover and bounding element
  const pacManArea = document.getElementById('pacman-area');
  // get current bounding edges
  const pacManAreaEdges = pacManArea.getBoundingClientRect();
  // svg element to move pacman
  const pacMan = document.getElementById('pacman');
  // svg g element for flipping pacman
  const pacManBody = document.getElementById('pacman-body');
  // text area
  let textElement = pacManArea.getElementsByTagName('text')[0];

  // move pacman and cancel onhover
  // using parent (<a>) because of svg mouseover complexity
  pacManArea.parentElement.onmouseenter = movePacMan;
  pacManArea.parentElement.onmouseleave = stopPacMan;

  let pacTimer;
  let open = 1;
  let direction = 1;
  let velocity = 5;
  function movePacMan() {
    // get current pacman edges
    let pacManEdges = pacMan.getBoundingClientRect();
    let left = pacManEdges.left;
    let right = pacManEdges.right;
    // pacman position value
    let x = parseInt(pacMan.getAttribute('x'), 10);
    // svg path element to open / close
    let path = pacMan.getElementsByTagName('path')[0];

    // check edges & change direction
    // move left
    if (direction === 1 && right + velocity > pacManAreaEdges.right) {
      direction = -direction;
      pacManBody.setAttribute('transform', 'scale(-1 1) translate(-50 0)');
      // reset text (so it can be eaten again)
      for (let i = 0; i < textElement.children.length; i++) {
        let e = textElement.children[i];
        e.style.opacity = 1;
      }
    }
    // move right
    if (direction === -1 && left - velocity < pacManAreaEdges.left) {
      direction = -direction;
      pacManBody.setAttribute('transform', '');
      // reset text (so it can be eaten again)
      for (let i = 0; i < textElement.children.length; i++) {
        let e = textElement.children[i];
        e.style.opacity = 1;
      }
    }

    // pacman movement (open/close and x direction move)
    // close pacman mouth
    if (open === 1) {
      path.setAttribute(
        'd',
        'M49.96,23.55C49.2,10.42,38.32,0,25,0S0,11.19,0,25s11.19,25,25,25,25-11.19,25-25H25l24.96-1.45Z'
      );
    }
    // open pacman mouth
    if (open === -1) {
      path.setAttribute(
        'd',
        'M46.65,12.5C42.33,5.03,34.25,0,25,0,11.19,0,0,11.19,0,25s11.19,25,25,25c9.25,0,17.33-5.03,21.65-12.5l-21.65-12.5,21.65-12.5Z'
      );
    }
    // reset open for next change
    open = -open;
    // move pacman
    pacMan.setAttribute('x', x + direction * velocity);

    // delete text on close only
    if (open === -1) {
      for (let i = 0; i < textElement.children.length; i++) {
        let e = textElement.children[i];
        let letterEdges = e.getBoundingClientRect();
        
        if (
          (direction === 1 && pacManEdges.right > letterEdges.left) ||
          (direction === -1 && pacManEdges.left < letterEdges.right)
        ) {
          e.style.opacity = 0;
        }
      }
    }

    // continue moving
    pacTimer = setTimeout(movePacMan, 300);
  }

  function stopPacMan() {
    clearTimeout(pacTimer);
  }

  // function changeDirection() {}
};
