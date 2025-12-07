// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('✅ Navigation initialized');
// //------------------------------

// let nav_animation = document.querySelectorAll(".brand-text")[0];
// let intervalId = null; // To hold the interval ID

// function nav_ani() {
//         nav_animation.addEventListener("mouseover", function() {
//         // Prevent multiple intervals from running
//     if (intervalId) return;

//     intervalId = setInterval(function() {
//         let red = Math.floor(Math.random() * 256);
//         let green = Math.floor(Math.random() * 256);
//         let blue = Math.floor(Math.random() * 256);
//         let degree = Math.floor(Math.random() * 360);
//         // Use backgroundColor and a template literal for cleaner syntax
//         nav_animation.style.backgroundImage = `linear-gradient(${degree}deg, rgb(${red}, ${green}, ${blue}), rgb(${blue}, ${red}, ${green}))`;
    
//         nav_animation.style.webkitBackgroundClip = "text";
//         nav_animation.style.transform = "scale(2)";
//         nav_animation.style.marginLeft = "70px";
//         nav_animation.style.webkitTextFillColor = "transparent";
//         nav_animation.style.backgroundClip = "text";
//         nav_animation.style.textFillColor = "transparent";
//     }, 1000);
// });

// nav_animation.addEventListener("mouseout", function() {
//     // Clear the interval when the mouse leaves
//     clearInterval(intervalId);
//     intervalId = null; // Reset the interval ID
//     // Optional: Reset the background to its original state
//     nav_animation.style.marginLeft = "0px";
//     nav_animation.style.transform = "scale(1)";
//     nav_animation.style.backgroundImage = "var(--gradient-primary)";
// });
// }

// window.addEventListener("load", function() {
//     if (window.innerWidth > 1150) {
//         nav_ani();
//     }
// });


// window.addEventListener("resize", function() {
//     if (window.innerWidth <1150) {
//         // Disable animation on small screens
//         nav_animation.style.backgroundImage = "var(--gradient-primary)";
//         return;
//     }
//     nav_ani();

// });