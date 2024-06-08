import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [ipv4, setIPV4] = useState("");
    const handleIPLookup = async () => {
        let ipAddress = "";

        try {
            let res = await axios.get("https://api.ipify.org?format=json");
            console.log("res4", res.data);
            ipAddress = res.data.ip;
            setIPV4(ipAddress);
        } catch (err) {
            console.log("failed for ipv4 : ", err);
        }
    };

    useEffect(() => {
        handleIPLookup();
    }, []);

    return (
        <div className="bg-slate-300 h-screen w-full">
            <div className="w-3/4">
                <p className="text-3xl">{ipv4}</p>
            </div>
        </div>
    );
}

export default App;
