import asyncHandler from 'express-async-handler'
import {prisma} from "../config/prismaConfig.js"


//basic format of making an API:
export const createUser = asyncHandler(async(req, res)=>{
    console.log("Creating a user")

    let{email} = req.body;
    const userExists = await prisma.user.findUnique({where: {email: email}});

    //register if user not exists
    if(!userExists) {
      const user = await prisma.user.create({data: req.body});
      res.status(201).json({
          message: "User registered successfully",
          user: user,
      });
    }
    else res.status(201).send({message: 'User already registered'});
});

//function to book a visit to residence
export const bookVisit = asyncHandler(async(req, res)=>{
  const {email, date} = req.body; //which user and which time is the requirement
  const {id} = req.params; //the second requirement (in params)

  try {

    //check if user is already booked the residency
    const alreadyBooked = await prisma.user.findUnique({
      where: {email},
      select: {bookedVisits: true}
    });

    if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)){
      res.status(400).json({message: "This residency is already booked by you."});
    } else {
      await prisma.user.update({
        where: {email: email},
        data:{
          bookedVisits: {push: {id, date}}
        }
      });
      res.send("Your visit is booked successfully.");
    }
    
    
  } catch (err) {
    throw new Error(err.message)
  }
});

//function to get all bookings of a user
export const getAllBookings = asyncHandler(async (req,res)=>{
  const {email} = req.body;

  try{
    const bookings = await prisma.user.findUnique({
      where: {email},
      select: {bookedVisits: true}
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to cancel the booking
export const cancelBooking = asyncHandler(async (req,res)=>{
  const {email} = req.body; //kim cancel edecek?
  const {id} = req.params; //hangi booking'i?

  try{
    //fetch user by their email and select the bookedVisits, not all the information
    const user = await prisma.user.findUnique({
      where: {email:email},
      select: {bookedVisits: true}
    });

    //need to find index of the booking (`const {id}`) that will be cancelled in the bookedVisits list
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if(index === -1){
      res.status(404).json({message:"Booking not found."});
    } else {
      user.bookedVisits.splice(index, 1); //delete only `1` element who has the `index`
      //then update
      await prisma.user.update({
        where: {email},
        data: {
          bookedVisits: user.bookedVisits //replace the bookedVisits array with the new one
        }
      });
      res.send("Booking cancelled successfully.");
    }

  } catch(err){
    throw new Error(err.message);
  }
});

//function to add a residency in favorite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const {email} = req.body; //kim favorilere edecek?
  const {rid} = req.params; //hangi residence'i? (residency id : rid)

  try{

    //fetch user by their email
    const user = await prisma.user.findUnique({
      where: {email}
    });
    //check if residence is already in favorite list
    if(user.favResidenciesID.includes(rid)){
      const updateUser = await prisma.user.update({
        where:{email},
        data: {
          favResidenciesID:{
            set: user.favResidenciesID.filter((id) => id !== rid)
          }
        }
      });
      res.send({message:"Residence removed from your favorites.", user: updateUser});
    }else{
      const updateUser = await prisma.user.update({
        where: {email},
        data: {
          favResidenciesID:{
            push: rid
          }
        }
      });
      res.send({message:"Residence added to your favorites.", user: updateUser});
    }

  }catch(err){
    throw new Error(err.message);
  }
});

//function to get all favorite residencies of a user
export const getAllFavorites = asyncHandler(async (req,res) => {
  const {email} = req.body;

  try{

    const favResd = await prisma.user.findUnique({
      where: {email},
      select: {favResidenciesID: true}
    });
    res.status(200).send(favResd);

  }catch(err){
    throw new Error(err.message);
  }
});