document.addEventListener('DOMContentLoaded', () => {

    // Traffic Light Animation for Home Page
    const lights = document.querySelectorAll('.light');
    if (lights.length > 0) {
        let step = 0;
        const sequence = [
            { idx: 0, time: 3000 }, // Red
            { idx: 2, time: 3000 }, // Green
            { idx: 1, time: 1000 }  // Yellow
        ];

        function runTrafficCycle() {
            lights.forEach(l => l.classList.remove('active'));
            const currentItem = sequence[step];
            lights[currentItem.idx].classList.add('active');
            setTimeout(() => {
                step = (step + 1) % sequence.length;
                runTrafficCycle();
            }, currentItem.time);
        }
        runTrafficCycle();
    }

    // Interactive Quiz Logic (Legacy for basic game.html if needed)
    const options = document.querySelectorAll('.quiz-option');
    if (options.length > 0) {
        options.forEach(option => {
            option.addEventListener('click', function () {
                const parent = this.parentElement;
                parent.querySelectorAll('.quiz-option').forEach(o => {
                    o.classList.remove('selected', 'correct', 'wrong');
                });
                this.classList.add('selected');
                if (this.dataset.correct === "true") {
                    this.classList.add('correct');
                    parent.querySelector('.feedback').textContent = "Дұрыс! Жарайсың! 🎉";
                    parent.querySelector('.feedback').style.color = "var(--secondary)";
                } else {
                    this.classList.add('wrong');
                    parent.querySelector('.feedback').textContent = "Қате. Қайтадан байқап көр. ❌";
                    parent.querySelector('.feedback').style.color = "var(--danger)";
                }
            });
        });
    }

    // --- NEW FEATURES ---

    // 1. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check saved
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // 2. Animated Counter
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.innerText;
        const speed = 200;

        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        // Reset to 0 before starting
        counter.innerText = 0;
        updateCount();
    });

    // 3. Facts Carousel
    const facts = [
        "Қараңғыда жүргізуші сені 100 метрден байқауы үшін шағылыстырғыш (фликер) тақ!",
        "Велосипедшілер де, жаяу жүргіншілер де жол ережесін сақтауы керек.",
        "Ең қауіпсіз орын – артқы орындықтың ортасы.",
        "Көлік тоқтамай тұрып, есік ашпа."
    ];
    const factText = document.getElementById('fact-text');
    if (factText) {
        let currentFact = 0;
        setInterval(() => {
            // Fade out
            factText.style.opacity = 0;
            setTimeout(() => {
                currentFact = (currentFact + 1) % facts.length;
                factText.innerText = facts[currentFact];
                factText.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    // 4. Mobile Menu Logic (Auto-inject & Toggle)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Check if button already exists (manually added in HTML)
        let toggleBtn = navbar.querySelector('.menu-toggle');

        // If checks fail, create it dynamically (fallback)
        if (!toggleBtn) {
            toggleBtn = document.createElement('div');
            toggleBtn.className = 'menu-toggle';
            toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            const logo = navbar.querySelector('.logo');
            if (logo) logo.insertAdjacentElement('afterend', toggleBtn);
        }

        // Toggle Logic
        const navLinks = navbar.querySelector('.nav-links');
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Switch Icon
            const icon = toggleBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggleBtn.querySelector('i').classList.remove('fa-xmark');
                toggleBtn.querySelector('i').classList.add('fa-bars');
            });
        });

        // Mobile Extras Injection removed by request
    }

});
