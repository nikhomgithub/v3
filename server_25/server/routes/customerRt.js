const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const dataRt = require('./dataRt')
const params=require('./params')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken')
const checkUserLevel=require('../middleware/checkUserLevel')

const param=params.customer

const routeTemplate=[

    {route:"mytest",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},

    {route:"init",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"getlimit",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"deletecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"addcustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"updatecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},

]  

dataRt({router,param,routeTemplate})

module.exports = router;