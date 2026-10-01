import React from "react";

export default function APITester({ 
    activeTab, 
    setActiveTab, 
    params, 
    setParams, 
    headers, 
    setHeaders, 
    body, 
    setBody 
}) {
    const handleKvChange = (list, setList, index, field, value) => {
        const updated = [...list];
        updated[index][field] = value;
        setList(updated);
    };

    const addKvRow = (list, setList) => {
        setList([...list, { key: "", value: "" }]);
    };

    const removeKvRow = (list, setList, index) => {
        setList(list.filter((_, i) => i !== index));
    };

    return (
        <div className="request-panel">
            <div className="panel-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'params' ? 'active' : ''}`}
                    onClick={() => setActiveTab('params')}
                >
                    Params
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'headers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('headers')}
                >
                    Headers
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'body' ? 'active' : ''}`}
                    onClick={() => setActiveTab('body')}
                >
                    Body (JSON)
                </button>
            </div>

            <div className="panel-body">
                {activeTab === 'params' && (
                    <div>
                        <table className="kv-table">
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                    <th style={{ width: '40px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {params.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <input 
                                                placeholder="Key" 
                                                value={item.key} 
                                                onChange={(e) => handleKvChange(params, setParams, idx, 'key', e.target.value)} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                placeholder="Value" 
                                                value={item.value} 
                                                onChange={(e) => handleKvChange(params, setParams, idx, 'value', e.target.value)} 
                                            />
                                        </td>
                                        <td>
                                            <button 
                                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                                                onClick={() => removeKvRow(params, setParams, idx)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="add-row-btn" onClick={() => addKvRow(params, setParams)}>+ Add Parameter</button>
                    </div>
                )}

                {activeTab === 'headers' && (
                    <div>
                        <table className="kv-table">
                            <thead>
                                <tr>
                                    <th>Header</th>
                                    <th>Value</th>
                                    <th style={{ width: '40px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {headers.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <input 
                                                placeholder="Header" 
                                                value={item.key} 
                                                onChange={(e) => handleKvChange(headers, setHeaders, idx, 'key', e.target.value)} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                placeholder="Value" 
                                                value={item.value} 
                                                onChange={(e) => handleKvChange(headers, setHeaders, idx, 'value', e.target.value)} 
                                            />
                                        </td>
                                        <td>
                                            <button 
                                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                                                onClick={() => removeKvRow(headers, setHeaders, idx)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="add-row-btn" onClick={() => addKvRow(headers, setHeaders)}>+ Add Header</button>
                    </div>
                )}

                {activeTab === 'body' && (
                    <textarea 
                        className="json-editor"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='{\n  "name": "aadi",\n  "email": "aadi@example.com"\n}'
                    />
                )}
            </div>
        </div>
    );
}