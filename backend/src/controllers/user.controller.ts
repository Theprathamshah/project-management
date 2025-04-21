import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from 'bcrypt';
import { Role } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export const getAllUsers = async (_: any, res: Response) : Promise<any> => {
  try {
    const response = await prisma.user.findMany({});
    if (!response) {
      return res.status(404).json({ message: "No users found" });
      return null;
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
    return null;
  }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
  
    const existingUser = await prisma.user.findUnique({ where: { id } });
  
    if (!existingUser) {
      return res.status(404).json({ message: `User with id ${id} not found.` });
    }
  
    const dataToUpdate: any = {};
  
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10);
    if (role) {
      if (!Object.values(Role).includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified.' });
      }
      dataToUpdate.role = role;
    }
  
    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  
    return res.status(200).json({
      message: `User with email ${updatedUser.email} updated successfully.`,
      data: updatedUser,
    });
  } catch (error: any) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserByEmail = async(req: Request, res: Response): Promise<any> => {
  try {
    const email = req.params.email;
    const user = await prisma.user.findFirst({where: {
      email
    }});
    return res.status(200).json({data: user});
  } catch (error) {
    console.log('Error fetching user by email', error);
    return null;
  }
}

export const deleteUser = async(req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params?.id;
    if(!id) {
      throw Error('Plese pass valid id');
    }
    await prisma.user.delete({
      where: {
        id
      }
    });
    return res.status(200).json({
      message: `User with id ${id} deleted successfully`
    });
  } catch (error: any) {
    console.log('Error while deleting the user', error.message)
    return null;
  }
}