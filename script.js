/* ------- Toggle icon Navbar */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navlinks.forEach((links) => {
                links.classList.remove("active");
                document
                    .querySelector("header nav a[href*=" + id + "]")
                    .classList.add("active");
            });
        }
    });

    /* ------- Sticky Header */
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    /* ------- Remove toggle and navbar when click on Nav bar link scroll */

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

/* ------- Scroll Reveal ----------------*/
ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal(".home-content , .heading", { origin: "top" });
ScrollReveal().reveal(
    ".home-img , .services-container , .portfolio-box , .contact form",
    { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1 , .about-img ", { origin: "left" });
ScrollReveal().reveal(".home-content p , .about-content ", { origin: "right" });

/* ------- Typed js ----------------*/

const typed = new Typed(".multiple-text", {
    strings: ["Web Developer", "Automation Engineer", "QA Engineer"],
    typeSpeed: 48,
    backSpeed: 48,
    backDelay: 1000,
    loop: true,
});

/*----Popup------*/
const showPopupBtn = document.getElementById("showPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("popup");

showPopupBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

/*----Popup2------*/
const showPopupBtn1 = document.getElementById("showPopupBtn1");
const closePopupBtn1 = document.getElementById("closePopupBtn1");
const popup1 = document.getElementById("popup1");

showPopupBtn1.addEventListener("click", () => {
    popup1.style.display = "block";
});

closePopupBtn1.addEventListener("click", () => {
    popup1.style.display = "none";
});

/*----Popup3------*/
const showPopupBtn2 = document.getElementById("showPopupBtn2");
const closePopupBtn2 = document.getElementById("closePopupBtn2");
const popup2 = document.getElementById("popup2");

showPopupBtn2.addEventListener("click", () => {
    popup2.style.display = "block";
});

closePopupBtn2.addEventListener("click", () => {
    popup2.style.display = "none";
});
/*----Popup4------*/
const showPopupBtn3 = document.getElementById("showPopupBtn3");
const closePopupBtn3 = document.getElementById("closePopupBtn3");
const popup3 = document.getElementById("popup3");

showPopupBtn3.addEventListener("click", () => {
    popup3.style.display = "block";
});

closePopupBtn3.addEventListener("click", () => {
    popup3.style.display = "none";
});

// Optional: Add JavaScript code for form submission and handling other interactions.
// For example, you can add code to handle form submission and display a success message.
// You can also use JavaScript to create dynamic elements, add animations, or implement other functionalities.
const popup4 = document.getElementById("popup4");
const submitReviewBtn4 = document.getElementById("submitReviewBtn4");
const closePopupBtn4 = document.getElementById("closePopupBtn4");
const reviewerName4 = document.getElementById("reviewerName4");
const reviewerEmail4 = document.getElementById("reviewerEmail4");
const reviewInput4 = document.getElementById("reviewInput4");

// Open popup button
const openPopupBtn4 = document.getElementById("openPopupBtn4");
if (openPopupBtn4) {
    openPopupBtn4.addEventListener("click", () => {
        popup4.style.display = "flex"; // center popup
    });
}

// Close popup button
closePopupBtn4.addEventListener("click", () => {
    popup4.style.display = "none";
});

// Submit review button
submitReviewBtn4.addEventListener("click", async () => {
    const name = reviewerName4.value.trim() || "Anonymous Reviewer";
    const email = reviewerEmail4.value.trim();
    const review = reviewInput4.value.trim();

    // Basic validation
    if (!email) {
        alert("Please enter your email.");
        return;
    }
    if (!review) {
        alert("Please write your review.");
        return;
    }

    // Disable button to prevent multiple submissions
    submitReviewBtn4.disabled = true;
    submitReviewBtn4.textContent = "Sending...";

    try {
        const response = await fetch("https://kunaldhauta.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                subject: "📩 Portfolio Website Review",
                message: review,
                number: "", // optional, can be removed
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Review sent successfully!");
            popup4.style.display = "none";
            // Clear inputs
            reviewerName4.value = "";
            reviewerEmail4.value = "";
            reviewInput4.value = "";
        } else {
            alert("❌ Error sending review: " + (result.error || "Unknown error"));
        }
    } catch (error) {
        alert("❌ Failed to send review. Try again later.");
        console.error(error);
    } finally {
        submitReviewBtn4.disabled = false;
        submitReviewBtn4.textContent = "Submit";
    }
});



// ---- Contact Form Submission (Email via Backend) ----
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        // Trimmed values to validate properly
        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const subject = formData.get("subject")?.trim();
        const message = formData.get("message")?.trim();
        const number = formData.get("number")?.trim(); // Optional

        // ✅ Validate required fields
        if (!name || !email || !subject || !message) {
            formStatus.textContent =
                "⚠️ Fields are empty. Mandatory fields are: Full Name, Email, Subject, and Message.";
            formStatus.style.color = "red";
            return;
        }

        // Show status and reset color
        formStatus.textContent = "⏳ Sending...";
        formStatus.style.color = "black";

        try {
            const response = await fetch("https://kunaldhauta.onrender.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    number,
                    subject,
                    message,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent =
                    "✅ Your message was submitted. Please hold tight until Kunal reaches back to you!";
                formStatus.style.color = "green";
                contactForm.reset();
            } else {
                formStatus.textContent = "❌ Something went wrong: " + result.error;
                formStatus.style.color = "red";
            }
        } catch (err) {
            formStatus.textContent = "❌ Failed to send message. Try again later.";
            formStatus.style.color = "red";
            console.error(err);
        }
    });
}



