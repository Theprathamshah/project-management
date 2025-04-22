import { Request, Response } from 'express';
import prisma from '../../prisma/client';

/**
 * @desc Create a new project
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, department, visibility, budget, userIds } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        department,
        visibility,
        budget,
        users: {
          connect: userIds?.map((id: string) => ({ id })),
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc Get all projects
 */
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: true,
        tasks: true,
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc Get project by ID
 */
export const getProjectById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        users: true,
        tasks: true,
      },
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc Update a project
 */
export const updateProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const { name, description, department, visibility, budget, status, userIds } = req.body;

    const existing = await prisma.project.findUnique({ where: { id: projectId } });
    if (!existing) return res.status(404).json({ message: 'Project not found' });

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
        department,
        visibility,
        budget,
        status,
        users: userIds
          ? {
            set: [],
            connect: userIds.map((id: string) => ({ id })),
          }
          : undefined,
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc Delete a project
 */
export const deleteProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await prisma.project.delete({ where: { id: projectId } });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
