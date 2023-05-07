// Load header.html into header element
window.onload = function() {
  var header = document.getElementById("header");
  var menu = document.getElementById("menu");
  var footer = document.getElementById("footer");

  // Load header.html
  var xhrHeader = new XMLHttpRequest();
  xhrHeader.onreadystatechange = function() {
    if (xhrHeader.readyState === XMLHttpRequest.DONE && xhrHeader.status === 200) {
      header.innerHTML = xhrHeader.responseText;
    }
  }
  xhrHeader.open('GET', 'header.html', true);
  xhrHeader.send();

  // Load menu.html
  var xhrMenu = new XMLHttpRequest();
  xhrMenu.onreadystatechange = function() {
    if (xhrMenu.readyState === XMLHttpRequest.DONE && xhrMenu.status === 200) {
      menu.innerHTML = xhrMenu.responseText;
    }
  }
  xhrMenu.open('GET', 'menu.html', true);
  xhrMenu.send();

  // Load footer.html
  var xhrFooter = new XMLHttpRequest();
  xhrFooter.onreadystatechange = function() {
    if (xhrFooter.readyState === XMLHttpRequest.DONE && xhrFooter.status === 200) {
      footer.innerHTML = xhrFooter.responseText;
    }
  }
  xhrFooter.open('GET', 'footer.html', true);
  xhrFooter.send();
};