window.onload = () => {
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.querySelector('.nav-toggle');
  
  const toggle = e => e.classList.toggle('is-active');
  const toggleNav = ({ target }) => Array.from(navMenu.classList).includes('is-active') ? toggle(navMenu) : null;

  hamburger.addEventListener('click', () => toggle(navMenu, 'is-active'));
  Array.from(navItems).forEach(e => e.addEventListener('click', toggleNav));

  // Video play/pause logic
  const projectTextDivs = document.querySelectorAll('.project-text');
  projectTextDivs.forEach(div => {
      const iframe = div.querySelector('iframe');
      
      if (iframe) {
          div.addEventListener('mouseenter', () => {
              iframe.style.display = 'block';
              iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          });

          div.addEventListener('mouseleave', () => {
              iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
              iframe.style.display = 'none';
          });

          window.addEventListener('scroll', () => {
              const rect = div.getBoundingClientRect();
              const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
              const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

              const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
              const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

              if (vertInView && horInView) {
                  iframe.style.display = 'block';
                  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
              } else {
                  iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                  iframe.style.display = 'none';
              }
          });
      }
  });
}
