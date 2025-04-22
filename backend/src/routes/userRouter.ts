import { Router } from "express";
import { deleteUser, getAllUsers, getUserByEmail, updateUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/", getAllUsers);
router.get('/:email' , getUserByEmail);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser)
export default router;
