const routes = new Map();

function backButtonListener() {

  window.onpopstate = (e) => {

    goto(e.state.path);

  }

}

function clickListener() {

  const links = document.getElementsByTagName('a');

  for (let i = 0; i < links.length; i++) {

    links[i].addEventListener('click', e => {

      e.preventDefault();

      try {
        
        if (e.srcElement.attributes.rel.value == 'external') return openNewTab(e.srcElement.attributes.href.value);
        else if (e.srcElement.attributes.rel.value == 'download') return console.log('download');

      } catch (err) {

        history.pushState({path: e.srcElement.pathname}, '', e.srcElement.href);
        goto(e.srcElement.pathname);

      }
    });

  }

}

function init() {

  let path = window.location.pathname;

  goto(path);

}

function goto(path) {

  let splittedPath = path.split('/');

  for (const [route, fn] of routes.entries()) {

    let splittedRoute = route.split('/');

    if (route == path) {

      return fn();

    }

    if (splittedRoute[1] == splittedPath[1]) {

      let count = splittedPath.length;
      let params = splittedPath.splice(2, count);
      return fn(...params);

    }

  }
  if (routes.has('*')) {

    return routes.get('*')();

  }
}

function openNewTab(url) {

  return window.open(url, '_blank');

}

export default function (route, fn) {

  if (route && fn) {

    routes.set(route, fn);

  }

  if (!route && !fn) {

    init();
    clickListener();
    backButtonListener();

  }
}
