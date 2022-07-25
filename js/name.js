const colors = [
    '#8A69D4',
    '#FFBE12',
    '#02BEFE',
    '#F88DD5',
    '#00C69F',
    '#FB4D44'
];

const str = 'Zina Boufalaas';
const spanDOM = document.querySelector('.intro-name');
let animationTime = 0.5;

let spanHTML = "";
function matters() {
    for (let i = 0; i < str.length; i++) {
        console.log(str.charAt(i));
        spanHTML += '<span style="animation-delay: ' + animationTime + 's; color:' + colors[Math.floor(Math.random() * 6)] + ';">'+str.charAt(i) + "</span>";
        animationTime+= 0.1;
    }
    spanDOM.innerHTML = spanHTML;
}
matters();