import { loginUser, registerUser } from './firebaseService.js';

export async function loginVM(email, password) {
    if (!email || !password) {
        return "Fields cannot be empty";
    }

    try {
        await loginUser(email, password);
        return "Login successful";
    } catch (error) {
        // Return user-friendly error messages
        switch (error.code) {
            case 'auth/user-not-found':
                return "No account found with this email";
            case 'auth/wrong-password':
                return "Incorrect password";
            case 'auth/invalid-email':
                return "Invalid email format";
            case 'auth/too-many-requests':
                return "Too many attempts. Please try again later";
            default:
                return error.message;
        }
    }
}

export async function signupVM(name, email, password) {
    if (!name || !email || !password) {
        return "All fields are required";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    try {
        // Pass the name to registerUser
        await registerUser(email, password, name);
        return "Account created successfully";
    } catch (error) {
        // Return user-friendly error messages
        switch (error.code) {
            case 'auth/email-already-in-use':
                return "Email already registered";
            case 'auth/invalid-email':
                return "Invalid email format";
            case 'auth/weak-password':
                return "Password should be at least 6 characters";
            default:
                return error.message;
        }
    }
}