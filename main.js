import { loginVM, signupVM } from './authViewModel.js';

document.addEventListener("DOMContentLoaded", () => {

    const loginContainer = document.querySelector(".login-container");
    const signupContainer = document.querySelector(".signup-container");

    const showSignupBtn = document.getElementById("showSignup");
    const showLoginBtn = document.getElementById("showLogin");

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    // 🟢 SWITCH TO SIGNUP with animation
    showSignupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Remove active from login first
        loginContainer.classList.remove("active");
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
            signupContainer.classList.add("active");
        }, 10);
    });

    // 🔵 SWITCH TO LOGIN with animation
    showLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Remove active from signup first
        signupContainer.classList.remove("active");
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
            loginContainer.classList.add("active");
        }, 10);
    });

    // 🔐 LOGIN
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = loginBtn.textContent;

        // Basic validation
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Show loading state
        loginBtn.textContent = "Logging in...";
        loginBtn.disabled = true;

        const result = await loginVM(email, password);
        
        if (result === "Login successful") {
            alert("🔓 Login successful! Welcome back!");
            // You can redirect or update UI here
            // window.location.href = "/dashboard.html";
            
            // Optional: Clear form
            loginForm.reset();
        } else {
            alert("Login failed: " + result);
        }

        // Reset button state
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    });

    // 📝 SIGNUP
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const signupBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = signupBtn.textContent;

        // Basic validation
        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Show loading state
        signupBtn.textContent = "Creating account...";
        signupBtn.disabled = true;

        const result = await signupVM(name, email, password);
        
        if (result === "Account created successfully") {
            alert("✨ Account created successfully! Please log in.");
            
            // Switch to login with smooth animation
            signupContainer.classList.remove("active");
            
            setTimeout(() => {
                loginContainer.classList.add("active");
                signupForm.reset();
            }, 10);
        } else {
            alert("Signup failed: " + result);
        }

        // Reset button state
        signupBtn.textContent = originalText;
        signupBtn.disabled = false;
    });

});