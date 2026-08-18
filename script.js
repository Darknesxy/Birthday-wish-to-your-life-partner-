/* =====================================================
   PRINCESS — BIRTHDAY WEBSITE
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PAGE SYSTEM
    ================================================= */

    const pages = document.querySelectorAll(".page");

    function showPage(id) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    // Music control
    if (id === "musicPage") {

        // Background Hindi song OFF
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }

    } else if (id === "secret") {

        // Happy Birthday song OFF
        if (music) {
            music.pause();
            music.currentTime = 0;
        }

        // Background Hindi song ON
        if (bgMusic) {
            bgMusic.currentTime = 0;
            bgMusic.play().catch(() => {
                console.log("Background music waiting for interaction.");
            });
        }

    } else {

        // Normal pages: background Hindi song ON
        if (bgMusic && bgMusic.paused) {
            bgMusic.play().catch(() => {
                console.log("Background music waiting for interaction.");
            });
        }
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =================================================  
   LOADER  
================================================= */  

const loader = document.getElementById("loader");  
const loaderBar = document.getElementById("loaderBar");  
const loaderPercent = document.getElementById("loaderPercent");  
const loaderText = document.getElementById("loaderText");  

let progress = 0;  

const loadingMessages = [  
    "Preparing your little universe...",  
    "Collecting beautiful memories...",  
    "Adding a little magic...",  
    "Hiding some surprises...",  
    "Almost ready, Princess..."  
];  

const loaderTimer = setInterval(() => {  

    progress += Math.floor(Math.random() * 7) + 4;  

    if (progress >= 100) {  
        progress = 100;  
    }  

    if (loaderBar) {  
        loaderBar.style.width = `${progress}%`;  
    }  

    if (loaderPercent) {  
        loaderPercent.textContent = `${progress}%`;  
    }  

    if (loaderText) {  

        const index = Math.min(  
            Math.floor(progress / 20),  
            loadingMessages.length - 1  
        );  

        loaderText.textContent =  
            loadingMessages[index];  
    }  

    if (progress >= 100) {  

        clearInterval(loaderTimer);  

        setTimeout(() => {  

            if (loader) {  
                loader.classList.add("hide");  
            }  

            showPage("intro");  

        }, 700);  
    }  

}, 130);

    /* =================================================
       START BUTTON
    ================================================= */

    const startBtn =
        document.getElementById("startBtn");

    if (startBtn) {

        startBtn.addEventListener("click", () => {

            createHeartBurst();

            setTimeout(() => {
                showPage("teasing");
            }, 500);

        });

    }


    /* =================================================
       TEASING PAGE
    ================================================= */

    const noBtn =
        document.getElementById("noBtn");

    const teaseMessage =
        document.getElementById("teaseMessage");

    if (noBtn) {

        noBtn.addEventListener("mouseenter", moveNoButton);

        noBtn.addEventListener("touchstart", (event) => {

            event.preventDefault();

            moveNoButton();

        });

    }

    function moveNoButton() {

        const maxX =
            Math.min(window.innerWidth - 170, 300);

        const maxY =
            Math.min(window.innerHeight - 100, 300);

        const x =
            Math.random() * maxX - maxX / 2;

        const y =
            Math.random() * maxY - maxY / 2;

        noBtn.style.transform =
            `translate(${x}px, ${y}px)`;

        if (teaseMessage) {

            const messages = [
                "Nice try 😏",
                "You can't escape!",
                "Princess, you have to click YES 😂",
                "Still trying? 👀",
                "I warned you 😌"
            ];

            teaseMessage.textContent =
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ];
        }
    }


    /* =================================================
       GENERIC NEXT BUTTONS
    ================================================= */

    document
        .querySelectorAll("[data-next]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const next =
                    button.dataset.next;

                showPage(next);

            });

        });


    document
        .querySelectorAll("[data-go]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const next =
                    button.dataset.go;

                showPage(next);

            });

        });


    /* =================================================
       CHALLENGE
    ================================================= */

    const answers =
        document.querySelectorAll(
            "#answers .option-btn"
        );

    const answerMessage =
        document.getElementById("answerMessage");

    const challengeNext =
        document.getElementById("challengeNext");

    answers.forEach(answer => {

        answer.addEventListener("click", () => {

            const correct =
                answer.dataset.correct === "true";

            if (correct) {

                answerMessage.textContent =
                    "Obviously Princess wins! 👑❤️";

                createHeartBurst();

                challengeNext.classList.remove(
                    "hidden"
                );

            } else {

                answerMessage.textContent =
                    "Wrong answer! Try again, troublemaker 😏";

                answer.animate(
                    [
                        { transform: "translateX(0)" },
                        { transform: "translateX(-8px)" },
                        { transform: "translateX(8px)" },
                        { transform: "translateX(0)" }
                    ],
                    {
                        duration: 350
                    }
                );

            }

        });

    });


    if (challengeNext) {

        challengeNext.addEventListener(
            "click",
            () => {

                showPage("fourYears");

            }
        );

    }


    /* =================================================
       FOUR YEARS COUNTER
    ================================================= */

    /*
       Change this date to your actual
       relationship starting date.

       Example:
       2022-08-19
    */

    const relationshipDate =
        new Date("2022-08-19T00:00:00");

    function updateCounter() {

        const now = new Date();

        let difference =
            now - relationshipDate;

        if (difference < 0) {
            difference = 0;
        }

        const seconds =
            Math.floor(difference / 1000);

        const days =
            Math.floor(seconds / 86400);

        const hours =
            Math.floor(
                (seconds % 86400) / 3600
            );

        const minutes =
            Math.floor(
                (seconds % 3600) / 60
            );

        const remainingSeconds =
            seconds % 60;

        setText("days", days);
        setText("hours", hours);
        setText("minutes", minutes);
        setText("seconds", remainingSeconds);

    }

    setInterval(updateCounter, 1000);

    updateCounter();


    /* =================================================
       MEMORIES
    ================================================= */

    const memoryGrid =
        document.getElementById("memoryGrid");

    const memoryProgress =
        document.getElementById("memoryProgress");

    const memoryNext =
        document.getElementById("memoryNext");

    const memories = [

        {
            image: "images/photo1.jpg",
            title: "The Beginning ❤️"
        },

        {
            image: "images/photo2.jpg",
            title: "That Beautiful Moment ✨"
        },

        {
            image: "images/photo3.jpg",
            title: "Our Crazy Side 😂"
        },

        {
            image: "images/photo4.jpg",
            title: "A Memory I Keep Close 💗"
        },

        {
            image: "images/photo5.jpg",
            title: "Still My Favourite Person 👑"
        }

    ];

    let discoveredMemories = 0;

    if (memoryGrid) {

        memories.forEach((memory, index) => {

            const card =
                document.createElement("div");

            card.className =
                "memory-card";

            card.innerHTML = `

                <img
                    src="${memory.image}"
                    alt="Memory ${index + 1}"
                >

                <div class="memory-overlay">

                    <div class="memory-title">
                        ${memory.title}
                    </div>

                </div>

            `;

            card.addEventListener(
                "click",
                () => {

                    if (
                        card.dataset.opened === "true"
                    ) {
                        return;
                    }

                    card.dataset.opened = "true";

                    discoveredMemories++;

                    card.style.transform =
                        "translateY(-10px) scale(1.03)";

                    updateMemoryProgress();

                    createMiniHearts(card);

                }
            );

            memoryGrid.appendChild(card);

        });

    }

    function updateMemoryProgress() {

        if (memoryProgress) {

            memoryProgress.textContent =
                `${discoveredMemories} / ${memories.length} memories discovered`;

        }

        if (
            discoveredMemories === memories.length &&
            memoryNext
        ) {

            memoryNext.classList.remove(
                "hidden"
            );

            createHeartBurst();

        }

    }

    if (memoryNext) {

        memoryNext.addEventListener(
            "click",
            () => {

                showPage("notes");

            }
        );

    }


    /* =================================================
       LOVE NOTES
    ================================================= */

    const notesGrid =
        document.getElementById("notesGrid");

    const noteReveal =
        document.getElementById("noteReveal");

    const notes = [

        "Your smile can change the whole mood. ❤️",

        "You somehow make ordinary moments special.",

        "You are my favourite notification. 📱❤️",

        "Your little habits are secretly adorable.",

        "Four years later, you are still my Princess. 👑",

        "And honestly... I would choose you again."

    ];

    if (notesGrid) {

        notes.forEach((note, index) => {

            const card =
                document.createElement("div");

            card.className =
                "note-card";

            card.innerHTML = `

                <span>
                    LITTLE THING #${index + 1}
                </span>

                <p>
                    Tap to reveal...
                </p>

            `;

            card.addEventListener(
                "click",
                () => {

                    const text =
                        card.querySelector("p");

                    text.textContent =
                        note;

                    card.animate(
                        [
                            {
                                transform:
                                    "scale(.96)"
                            },
                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration: 350
                        }
                    );

                    if (noteReveal) {

                        noteReveal.textContent =
                            "Okay... maybe I have more to say than I expected. 🥹❤️";

                    }

                }
            );

            notesGrid.appendChild(card);

        });

    }


    /* =================================================
       CONSTELLATION
    ================================================= */

    const starsContainer =
        document.getElementById("stars");

    const starProgress =
        document.getElementById("starProgress");

    const starMessage =
        document.getElementById("starMessage");

    const starNext =
        document.getElementById("starNext");

    let collectedStars = 0;

    const starPositions = [

        { left: 15, top: 25 },
        { left: 35, top: 55 },
        { left: 52, top: 20 },
        { left: 67, top: 62 },
        { left: 80, top: 32 },
        { left: 44, top: 78 }

    ];

    if (starsContainer) {

        starPositions.forEach(
            (position, index) => {

                const star =
                    document.createElement("div");

                star.className = "star";

                star.style.left =
                    `${position.left}%`;

                star.style.top =
                    `${position.top}%`;

                star.style.animationDelay =
                    `${index * .2}s`;

                star.addEventListener(
                    "click",
                    () => {

                        if (
                            star.dataset.collected
                        ) {
                            return;
                        }

                        star.dataset.collected =
                            "true";

                        collectedStars++;

                        star.style.opacity =
                            "0";

                        star.style.transform =
                            "scale(3)";

                        updateStars();

                        createStarBurst(
                            star
                        );

                    }
                );

                starsContainer.appendChild(star);

            }
        );

    }

    function updateStars() {

        if (starProgress) {

            starProgress.textContent =
                `${collectedStars} / 6`;

        }

        if (collectedStars === 6) {

            if (starMessage) {

                starMessage.textContent =
                    "You found our little constellation. 🌌❤️";

            }

            if (starNext) {

                starNext.classList.remove(
                    "hidden"
                );

            }

            createHeartBurst();

        }

    }

    if (starNext) {

        starNext.addEventListener(
            "click",
            () => {

                showPage("game");

                startHeartGame();

            }
        );

    }


    /* =================================================
       MINI HEART GAME
    ================================================= */

    const gameArea =
        document.getElementById("gameArea");

    const gameScore =
        document.getElementById("gameScore");

    let score = 0;

    let gameStarted = false;

    function startHeartGame() {

        if (gameStarted) {
            return;
        }

        gameStarted = true;

        score = 0;

        updateGameScore();

        spawnGameHeart();

    }

    function spawnGameHeart() {

        if (
            !gameArea ||
            score >= 5
        ) {
            return;
        }

        const heart =
            document.createElement("div");

        heart.className =
            "game-heart";

        heart.textContent =
            ["❤️", "💗", "💖", "💘"][
                Math.floor(
                    Math.random() * 4
                )
            ];

        const maxX =
            gameArea.clientWidth - 50;

        const maxY =
            gameArea.clientHeight - 50;

        heart.style.left =
            `${Math.random() * maxX}px`;

        heart.style.top =
            `${Math.random() * maxY}px`;

        heart.addEventListener(
            "click",
            () => {

                score++;

                updateGameScore();

                heart.remove();

                createMiniHeartAt(
                    gameArea
                );

                if (score >= 5) {

                    setTimeout(() => {

                        showPage("musicPage");

                    }, 900);

                } else {

                    setTimeout(
                        spawnGameHeart,
                        300
                    );

                }

            }
        );

        gameArea.appendChild(heart);

        setTimeout(() => {

            if (heart.isConnected) {

                heart.remove();

                spawnGameHeart();

            }

        }, 1800);

    } 

    function updateGameScore() {

        if (gameScore) {

            gameScore.textContent =
                `${score} / 5`;

        }

    }


    /* =================================================
       MUSIC
    ================================================= */

    const music =
        document.getElementById("music");

    const musicBtn =
        document.getElementById("musicBtn");

    const musicDisc =
        document.getElementById("musicDisc");

    if (musicBtn && music) {

        musicBtn.addEventListener(
            "click",
            async () => {

                try {

                    if (music.paused) {

                        await music.play();

                        musicBtn.textContent =
                            "Pause Music ⏸️";

                        if (musicDisc) {

                            musicDisc.classList.add(
                                "playing"
                            );

                        }

                    } else {

                        music.pause();

                        musicBtn.textContent =
                            "Play Music 🎵";

                        if (musicDisc) {

                            musicDisc.classList.remove(
                                "playing"
                            );

                        }

                    }

                } catch (error) {

                    musicBtn.textContent =
                        "Tap Again 🎵";

                    console.log(
                        "Music error:",
                        error
                    );

                }

            }
        );

    }


    /* =================================================
       CAKE / WISH
    ================================================= */

    const wishBtn =
        document.getElementById("wishBtn");

    if (wishBtn) {

        wishBtn.addEventListener(
            "click",
            () => {

                wishBtn.textContent =
                    "Wish sent to the universe ✨❤️";

                createHeartBurst();

                setTimeout(() => {

                    showPage("secret");

                }, 1800);

            }
        );

    }


    /* =================================================
       SECRET VAULT
    ================================================= */

    const vaultBtn =
        document.getElementById("vaultBtn");

    if (vaultBtn) {

        vaultBtn.addEventListener(
            "click",
            () => {

                vaultBtn.textContent =
                    "Unlocked ❤️";

                createHeartBurst();

                setTimeout(() => {

                    showPage("letter");

                }, 1000);

            }
        );

    }


    /* =================================================
       LETTER
    ================================================= */

    const letterBtn =
        document.getElementById("letterBtn");

    const letterText =
        document.getElementById("letterText");

    const letter = `My Princess 👑

Four years have passed, but somehow there are still moments when I look at you and think...

How did I get this lucky?

We have laughed, annoyed each other, made memories, survived little arguments and collected countless moments together.

This website is just a tiny way of saying something simple:

You are special to me.

I hope your birthday brings you the same happiness that you have brought into my life.

Keep smiling.
Keep being you.

Happy Birthday, Princess. ❤️`;

    if (letterBtn) {

        letterBtn.addEventListener(
            "click",
            () => {

                letterBtn.style.display =
                    "none";

                if (letterText) {

                    typeWriter(
                        letterText,
                        letter,
                        25
                    );

                }

                createHeartBurst();

                setTimeout(() => {

                    showPage("final");

                    createFinalPhotos();

                }, 12000);

            }
        );

    }


    /* =================================================
       REPLAY
    ================================================= */

    const replayBtn =
        document.getElementById("replayBtn");

    if (replayBtn) {

        replayBtn.addEventListener(
            "click",
            () => {

                location.reload();

            }
        );

    }


    /* =================================================
       FINAL PHOTOS
    ================================================= */

    function createFinalPhotos() {

        const container =
            document.getElementById(
                "finalPhotos"
            );

        if (!container) {
            return;
        }

        if (container.children.length > 0) {
            return;
        }

        memories.forEach(memory => {

            const img =
                document.createElement("img");

            img.src =
                memory.image;

            img.alt =
                "Our memory";

            container.appendChild(img);

        });

    }


    /* =================================================
       STAR BACKGROUND
    ================================================= */

    const canvas =
        document.getElementById("starCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let stars = [];

        function resizeCanvas() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

            createBackgroundStars();

        }

        function createBackgroundStars() {

            stars = [];

            const amount =
                Math.min(
                    180,
                    Math.floor(
                        window.innerWidth *
                        window.innerHeight /
                        8000
                    )
                );

            for (
                let i = 0;
                i < amount;
                i++
            ) {

                stars.push({

                    x:
                        Math.random() *
                        canvas.width,

                    y:
                        Math.random() *
                        canvas.height,

                    radius:
                        Math.random() * 1.5,

                    alpha:
                        Math.random(),

                    speed:
                        .002 +
                        Math.random() * .008

                });

            }

        }

        function animateStars() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            stars.forEach(star => {

                star.alpha +=
                    star.speed;

                const opacity =
                    .25 +
                    Math.abs(
                        Math.sin(star.alpha)
                    ) * .7;

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255,255,255,${opacity})`;

                ctx.fill();

            });

            requestAnimationFrame(
                animateStars
            );

        }

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        resizeCanvas();

        animateStars();

    }


    /* =================================================
       HEART EFFECTS
    ================================================= */

    function createHeartBurst() {

        const container =
            document.getElementById(
                "hearts"
            );

        if (!container) {
            return;
        }

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const heart =
                document.createElement("div");

            heart.textContent =
                ["❤️", "💗", "💖", "✨"][
                    Math.floor(
                        Math.random() * 4
                    )
                ];

            heart.style.position =
                "absolute";

            heart.style.left =
                `${40 + Math.random() * 20}%`;

            heart.style.top =
                `${45 + Math.random() * 10}%`;

            heart.style.fontSize =
                `${15 + Math.random() * 25}px`;

            heart.style.transition =
                "all 1.5s ease";

            container.appendChild(heart);

            requestAnimationFrame(() => {

                heart.style.transform =
                    `translate(
                        ${(Math.random() - .5) * 500}px,
                        ${-100 - Math.random() * 400}px
                    ) scale(${.5 + Math.random()})`;

                heart.style.opacity =
                    "0";

            });

            setTimeout(() => {
                heart.remove();
            }, 1600);

        }

    }


    function createMiniHearts(element) {

        const rect =
            element.getBoundingClientRect();

        const container =
            document.getElementById(
                "hearts"
            );

        if (!container) {
            return;
        }

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const heart =
                document.createElement("div");

            heart.textContent = "❤️";

            heart.style.position =
                "fixed";

            heart.style.left =
                `${rect.left + rect.width / 2}px`;

            heart.style.top =
                `${rect.top + rect.height / 2}px`;

            heart.style.transition =
                "all .9s ease";

            container.appendChild(heart);

            requestAnimationFrame(() => {

                heart.style.transform =
                    `translate(
                        ${(Math.random() - .5) * 180}px,
                        ${-80 - Math.random() * 150}px
                    )`;

                heart.style.opacity =
                    "0";

            });

            setTimeout(() => {
                heart.remove();
            }, 1000);

        }

    }


    function createMiniHeartAt(element) {

        if (!element) {
            return;
        }

        const heart =
            document.createElement("div");

        heart.textContent = "💗";

        heart.style.position =
            "absolute";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.fontSize =
            "30px";

        heart.style.pointerEvents =
            "none";

        element.appendChild(heart);

        setTimeout(() => {

            heart.style.transform =
                "translateY(-100px)";

            heart.style.opacity =
                "0";

        }, 20);

        setTimeout(() => {
            heart.remove();
        }, 800);

    }


    function createStarBurst(star) {

        const rect =
            star.getBoundingClientRect();

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const particle =
                document.createElement("div");

            particle.textContent = "✨";

            particle.style.position =
                "fixed";

            particle.style.left =
                `${rect.left}px`;

            particle.style.top =
                `${rect.top}px`;

            particle.style.pointerEvents =
                "none";

            particle.style.zIndex =
                "1000";

            particle.style.transition =
                "all .7s ease";

            document.body.appendChild(
                particle
            );

            requestAnimationFrame(() => {

                particle.style.transform =
                    `translate(
                        ${(Math.random() - .5) * 160}px,
                        ${(Math.random() - .5) * 160}px
                    )`;

                particle.style.opacity =
                    "0";

            });

            setTimeout(() => {

                particle.remove();

            }, 800);

        }

    }
    
    /* =================================================
       TYPEWRITER
    ================================================= */

    function typeWriter(
        element,
        text,
        speed
    ) {

        let index = 0;

        element.textContent = "";

        const timer =
            setInterval(() => {

                element.textContent +=
                    text.charAt(index);

                index++;

                if (
                    index >= text.length
                ) {

                    clearInterval(timer);

                }

            }, speed);

    }


    /* =================================================
       HELPER
    ================================================= */

    function setText(
        id,
        value
    ) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                value;

        }

    }


    /* =================================================
       SOUND BUTTON
    ================================================= */

    const soundBtn =
        document.getElementById(
            "soundBtn"
        );

    if (soundBtn && music) {

        soundBtn.addEventListener(
            "click",
            async () => {

                try {

                    if (music.paused) {

                        await music.play();

                        soundBtn.textContent =
                            "🔊";

                    } else {

                        music.pause();

                        soundBtn.textContent =
                            "🔇";

                    }

                } catch (error) {

                    console.log(
                        "Audio error:",
                        error
                    );

                }

            }
        );

    }


    /* =================================================
       INITIAL STATE
    ================================================= */

    showPage("intro");

});