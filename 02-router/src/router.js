const routes = new Map();

function BackButtonListener() {

  window.onpopstate = (e) => {
    console.log(e);
    goto(e.state.path);
  }

}

function ClickListener() {

  const links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', e => {
      e.preventDefault();
      console.log(e);
      history.pushState({path: e.srcElement.pathname}, '', e.srcElement.href);
      goto(e.srcElement.pathname);
    });
  }
}

function init() {
  const path = window.location.pathname;
  goto(path);
}

function goto(path) {
  const splittedPath = path.split('/');
  for (const [route, fn] of routes.entries()) {
    const splittedRoute = route.split('/');
    if (route == path) {
      return fn();
    }
    if (splittedRoute[1] == splittedPath[1]) {
      return fn(splittedPath[2]);
    }
  }
}

export default function (route, fn) {
  if (route && fn) {
    routes.set(route, fn);
  }

  if (!route && !fn) {
    init();
    ClickListener();
    BackButtonListener();
  }
}
