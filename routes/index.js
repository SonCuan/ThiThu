// code base
import  express  from 'express';
import { createProduct, getAll, getDetail, getUpdate, remove } from '../controllers/product.js';
import { login, signup } from './../controllers/auth.js';
import { checkPermission } from '../middlewares/index.js';

const router = express.Router();
router.post("/product", checkPermission, createProduct);
router.get("/product/:id", getDetail);
router.get("/product", getAll);
router.patch("/product/:id", checkPermission, getUpdate);
router.delete("/product/:id",checkPermission, remove);
// user
router.post("/login", login);
router.post("/register" , signup);


export default router;  