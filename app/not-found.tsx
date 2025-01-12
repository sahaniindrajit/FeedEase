"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 5000);

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [router]);

    return (
        <div>
            <div className="grid min-h-[80vh] place-content-center px-4">
                <h1 className="uppercase text-center tracking-widest text-slate-300">
                    404 | Page Not Found!
                </h1>
                <p className="text-slate-200 text-center mt-4">
                    Redirecting to Home 🏡 Page in {countdown} seconds...
                </p>

                <p className="text-slate-200 font-thin text-center mt-2">
                    - FeedEase -
                </p>
            </div>
        </div>
    );
};

export default Page;