(() => {
let x = document.querySelector('div.app');
x.lastChild.remove();
x = x.children[0];
x.style = 'flex-grow: 1';
x = x.children[2];
x.style.width = '100%';
x = document.querySelector('div.mainblock');
x.style = 'flex-grow: 1';
})();