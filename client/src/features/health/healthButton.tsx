import { useState } from "react";
import { getHealthStatus } from "./healthApi";

export function HealthButton() {
    const [healthStatus, setHealthStatus] = useState<{ status: string, message: string }>({ status: '', message: '' });

    async function testDbConnection() {
        try {
            console.log('Testing DB connection...');
            const health = await getHealthStatus();
            setHealthStatus(health);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={testDbConnection} className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 ">
                Tester la connexion
            </button>
            <p>{healthStatus.message}</p>
        </>
    );
}