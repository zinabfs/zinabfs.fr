let list = document.querySelectorAll(".menu-item");
const projectImg = document.getElementById("project-right");



list.forEach(e=>{
    e.addEventListener('mouseover', function(event) {
        console.log(e.dataset.project)
        // console.log( document.getElementById(event.target.dataset.project))
        // console.log(event.target)
        document.getElementById(e.dataset.project).style.opacity = '1';
        document.getElementById(e.dataset.project).style.transform = 'scale(1.1)';
        // projectImg.style.backgroundImage = imageURLS[event.target.dataset.project];
        // projectImg.style.opacity ='1'
    })

    e.addEventListener('mouseout', function(event) {
        document.getElementById(e.dataset.project).style.opacity = '0';
        document.getElementById(e.dataset.project).style.transform = 'scale(1)';
    })
})




//scale 1.1