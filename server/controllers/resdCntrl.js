import asyncHandler from 'express-async-handler'
import {prisma} from '../config/prismaConfig.js'

export const createResidency = asyncHandler(async (req,res) => {
    const {title, description, price, address, country, city, facilities,image, userEmail} = req.body.data;

    console.log(req.body.data);
    try{
      const residency = await prisma.residency.create({
        data: {
          title, 
          description, 
          price, 
          address, 
          country, 
          city, 
          facilities, 
          image,
          owner: {connect: {email: userEmail}}, //user collection'ı ile bağlanmış oldular; owner sayesinde.
        },
      });
      res.send({message:"Residency created successfully", residency})

    }catch(err){
        if(err.code === "P2002") //P2002: a coundition if a unique address is violated
        {
            throw new Error("A residency with this address already there.");
        }
        throw new Error(err.message);
    }
});

//function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async(req,res)=>{
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(residencies);
});

//function to get a specific document/residency
export const getResidency = asyncHandler(async(req,res)=>{
    const {id} = req.params; // `req.body:` through the payload/raw body ||| `req.params:` uses url to send 

    try{
        const residency = await prisma.residency.findUnique({
            where: {id} //or you can use s.a.: `where: {id: id}`
        });
        res.send(residency);
    }catch(err){
        throw new Error(err.message);
    }

});