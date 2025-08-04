import express from 'express';
import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavorites, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

router.post("/register", jwtCheck, createUser);  //request type will be "post request"
router.post("/bookVisit/:id", jwtCheck, bookVisit) //when someone book a residence visit
router.post("/allBookings", getAllBookings); 
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFavs", jwtCheck, getAllFavorites);

export {router as userRoute}