import React, { useState } from "react";
import "./App.css";

export default function App() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("http://localhost:3000/user");
    const [body, setBody] = useState('{\n  "name": "aadi",\n  "email": "aadi@example.com"\n}');
    
    // Response State
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const handleSendRequest = async () => {
        setLoading(true);
        setResponse(null);

        const startTime = performance.now();

        try {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
            };

            // Send body only for relevant request types
            if (["POST", "PUT", "PATCH"].includes(method) && body.trim() !== "") {
                options.body = body;
            }

            const res = await fetch(url, options);
            const endTime = performance.now();

            const contentType = res.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            setResponse({
                status: res.status,
                statusText: res.statusText || "OK",
                time: Math.round(endTime - startTime),
                size: new Blob([typeof data === "object" ? JSON.stringify(data) : data]).size,
                data: data,
            });
        } catch (err) {
            setResponse({
                status: 0,
                statusText: "Network Error",
                time: 0,
                size: 0,
                data: { error: "Failed to connect to " + url + ". Is your server running?" },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* 1. TOP HEADER */}
            <header className="dashboard-header">
                <h1>API testing Dashboard</h1>
            </header>

            <main className="dashboard-content">
                {/* 2. METHOD DROPDOWN + URL BAR + SEND BUTTON */}
                <div className="request-bar">
                    <select 
                        className={`method-select method-${method}`}
                        value={method} 
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>

                    <input 
                        type="text" 
                        className="url-input" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter Request URL (e.g., http://localhost:3000/user)"
                    />

                    <button className="send-btn" onClick={handleSendRequest} disabled={loading}>
                        {loading ? "Sending..." : "Send Request"}
                    </button>
                </div>

                {/* 3. REQUEST BODY AREA */}
                <section className="section-box">
                    <div className="section-title">
                        <h3>Request Body (JSON)</h3>
                    </div>
                    <div className="section-body">
                        <textarea 
                            className="code-editor"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='{\n  "name": "aadi",\n  "email": "aadi@example.com"\n}'
                        />
                    </div>
                </section>

                {/* 4. RESPONSE AREA */}
                <section className="section-box">
                    <div className="response-header">
                        <h3>Response</h3>
                        {response && (
                            <div className="response-meta">
                                <span className={`status-badge ${response.status >= 200 && response.status < 300 ? 'status-success' : 'status-error'}`}>
                                    {response.status} {response.statusText}
                                </span>
                                <span className="meta-info">Time: {response.time} ms</span>
                                <span className="meta-info">Size: {response.size} B</span>
                            </div>
                        )}
                    </div>

                    <div className="section-body">
                        {response ? (
                            <pre className="code-viewer">
                                {typeof response.data === "object" 
                                    ? JSON.stringify(response.data, null, 2) 
                                    : response.data}
                            </pre>
                        ) : (
                            <div className="empty-response">
                                Response output will appear here after sending a request
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}