import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await prisma.user.findMany({});
        if (!response) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}