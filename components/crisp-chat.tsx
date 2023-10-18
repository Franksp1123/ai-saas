"use client";

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("bc73b710-5b35-4701-b269-add87cf450ca")
    }, []);

    return null;
}