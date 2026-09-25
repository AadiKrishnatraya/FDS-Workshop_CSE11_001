import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
    const [usersList, setUsersList] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", email: "" });

    // Quick Sign Up Form State
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    // Fetch registered users list from Express server
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/user");
            if (res.ok) {
                const data = await res.json();
                // Filter out any broken/empty objects just in case
                const validUsers = data.filter(u => u && u.name && u.email);
                setUsersList(validUsers);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle Sign Up
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        // Validate non-empty inputs
        const trimmedName = signupData.name.trim();
        const trimmedEmail = signupData.email.trim();
        const trimmedPassword = signupData.password.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            setStatusMessage({ type: "error", text: "Name, email, and password cannot be empty spaces." });
            return;
        }

        setLoading(true);
        setStatusMessage(null);

        try {
            const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    password: trimmedPassword,
                    age: signupData.age ? Number(signupData.age) : null
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMessage({ type: "success", text: "User registered successfully!" });
                setSignupData({ name: "", email: "", password: "", age: "" });
                fetchUsers();
            } else {
                setStatusMessage({ type: "error", text: data.message || "Failed to register" });
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Cannot connect to server." });
        } finally {
            setLoading(false);
        }
    };

    // Handle Delete User
    const handleDeleteUser = async (id) => {
        if (!window.confirm(`Delete user #${id}?`)) return;

        try {
            const res = await fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setStatusMessage({ type: "success", text: `User #${id} deleted.` });
                fetchUsers();
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Failed to delete user." });
        }
    };

    // Start editing user row
    const handleStartEdit = (user) => {
        setEditingUserId(user.id);
        setEditFormData({ name: user.name || "", email: user.email || "" });
    };

    // Save edited user
    const handleSaveEdit = async (id) => {
        const trimmedName = editFormData.name.trim();
        const trimmedEmail = editFormData.email.trim();

        if (!trimmedName || !trimmedEmail) {
            setStatusMessage({ type: "error", text: "Name and email cannot be blank when updating." });
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/user/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmedName, email: trimmedEmail })
            });

            if (res.ok) {
                setEditingUserId(null);
                setStatusMessage({ type: "success", text: `User #${id} updated.` });
                fetchUsers();
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Failed to update user." });
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>User Management Portal</h1>
            </header>

            <main className="dashboard-content">
                {/* STATUS NOTIFICATION */}
                {statusMessage && (
                    <div className={`status-banner ${statusMessage.type}`}>
                        {statusMessage.text}
                    </div>
                )}

                {/* 1. SIGN UP SECTION */}
                <section className="section-box">
                    <div className="section-title">
                        <h3>Register New User</h3>
                    </div>
                    <div className="section-body">
                        <form className="signup-form" onSubmit={handleSignUpSubmit}>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={signupData.name}
                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                required
                            />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                value={signupData.email}
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={signupData.password}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                required
                            />
                            <input 
                                type="number" 
                                placeholder="Age (optional)" 
                                value={signupData.age}
                                onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
                            />
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Registering..." : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </section>

                {/* 2. REGISTERED USERS TABLE */}
                <section className="section-box">
                    <div className="section-title">
                        <h3>Registered Users ({usersList.length})</h3>
                    </div>
                    <div className="section-body">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th style={{ width: "60px" }}>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th style={{ width: "160px", textAlign: "center" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                                            No registered users found.
                                        </td>
                                    </tr>
                                ) : (
                                    usersList.map((u) => (
                                        <tr key={u.id}>
                                            <td>#{u.id}</td>
                                            <td>
                                                {editingUserId === u.id ? (
                                                    <input 
                                                        type="text" 
                                                        className="table-input"
                                                        value={editFormData.name} 
                                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                                    />
                                                ) : (
                                                    u.name || <em style={{ color: "#777" }}>No Name</em>
                                                )}
                                            </td>
                                            <td>
                                                {editingUserId === u.id ? (
                                                    <input 
                                                        type="email" 
                                                        className="table-input"
                                                        value={editFormData.email} 
                                                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                                    />
                                                ) : (
                                                    u.email || <em style={{ color: "#777" }}>No Email</em>
                                                )}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {editingUserId === u.id ? (
                                                    <div className="action-btns">
                                                        <button className="btn-save" onClick={() => handleSaveEdit(u.id)}>Save</button>
                                                        <button className="btn-cancel" onClick={() => setEditingUserId(null)}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <div className="action-btns">
                                                        <button className="btn-update" onClick={() => handleStartEdit(u)}>Update</button>
                                                        <button className="btn-delete" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}