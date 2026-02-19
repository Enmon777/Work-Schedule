const SUPABASE_URL = "https://faytxvpoqsifhhqktiwv.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

document.addEventListener("DOMContentLoaded", async function () {

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  const loginContainer = document.querySelector(".login-container");
  const signupContainer = document.querySelector(".signup-container");

  const showSignupBtn = document.getElementById("showSignup");
  const showLoginBtn = document.getElementById("showLogin");

  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const roleSelect = document.getElementById("roleSelect");

  // ========================
  // VIEW SWITCH
  // ========================

  showSignupBtn?.addEventListener("click", function () {
    loginContainer.classList.remove("active");
    signupContainer.classList.add("active");
  });

  showLoginBtn?.addEventListener("click", function () {
    signupContainer.classList.remove("active");
    loginContainer.classList.add("active");
  });

  // ========================
  // SIGN UP
  // ========================

  signupForm?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const role = roleSelect.value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            full_name: fullName,
            role: role
          }
        ]);

      if (profileError) {
        alert(profileError.message);
        return;
      }
    }

    alert("Account created successfully!");

    signupForm.reset();
    signupContainer.classList.remove("active");
    loginContainer.classList.add("active");
  });

  // ========================
  // LOGIN
  // ========================

  loginForm?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      alert(profileError.message);
      return;
    }

    if (profile.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "employee-dashboard.html";
    }
  });

});
