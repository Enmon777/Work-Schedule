        (function() {
            const loginContainer = document.querySelector(".login-container");
            const signupContainer = document.querySelector(".signup-container");

            const showSignupBtn = document.getElementById("showSignup");
            const showLoginBtn = document.getElementById("showLogin");

            const signupForm = document.getElementById("signupForm");
            const loginForm = document.getElementById("loginForm"); // optional, but we add a tiny handler

            // switch to signup
            showSignupBtn.addEventListener("click", (e) => {
                e.preventDefault();
                loginContainer.classList.remove("active");
                signupContainer.classList.add("active");
            });

            // switch to login
            showLoginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                signupContainer.classList.remove("active");
                loginContainer.classList.add("active");
            });

            // after signup submit → show success + back to login
            if (signupForm) {
                signupForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    // you can add field validation if needed, but we keep it minimal and cool
                    alert("✨ Account created! Welcome aboard.");
                    signupContainer.classList.remove("active");
                    loginContainer.classList.add("active");
                    // optional: clear signup fields (just for ux)
                    signupForm.reset();
                });
            }

            // optional: handle login just to show a neat message (doesn't actually send)
            if (loginForm) {
                loginForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    alert("🔓 login successful (demo). redirect ...");
                    // you could reset or do nothing – just for the feel
                });
            }

            // tiny extra: if someone clicks on "register" from login, it's already done.
            // also automatically focus? but not needed.
        })();