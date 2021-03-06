const BasicData=require('../modals/BasicData');

const jwt = require('jsonwebtoken');

const checkUserLevel =()=>{
    console.log('checkUserLevel')
    return async (req,res,next)=>{
        try{
              
                let User    
                if(process.env.AUTH_CONNECTION=="true"){
                    User=require('../modals/Auth').User;
                }else{
                    User=require('../modals/User')
                }  

              //console.log(req.headers)
              if(!req.headers.userauthorization){throw {message:`Unauthorized-user1`}}
              
              const userToken = req.headers.userauthorization.split(" ")[1];           
                
              if(!userToken){throw {message:`Unauthorized-user2`}}
  
              const userDecoded = jwt.verify(userToken, process.env.JWT_SECRET);
                          
              //console.log("userDecoded")
              //console.log(userDecoded)
              //console.log('1')
              const userResult=await User.findOne({
                  id:userDecoded.id,
                  code:userDecoded.code,
                  shopId:req.shopId
              })
              //authConnection.close()

              //console.log(userResult)
              if(!userResult){throw {message:`Unauthorized-user3`}}
              if(!userResult.active){throw {message:`Unauthorized-user4`}} 
                 
              const {id,username,userLevel}=userResult
              req.user={id,username,userLevel}
              
            //==============
            const resultBasicData=await BasicData.findOne({shopId:req.shopId})
            if(!resultBasicData){throw {message:`Unauthorized-user5`}} 
            const {routeAuth}=resultBasicData
            
            //console.log(userResult)
            //console.log(resultBasicData)

            for (let i=0;i<routeAuth.length;i++){
                if(routeAuth[i].routeAddress==req.routeAddress){
                    for(let j=0;j<routeAuth[i].userLevel.length;j++){
                        if(routeAuth[i].userLevel[j]==req.user.userLevel)
                        {
                            //console.log('found you')
                            return next()
                        }  
                    }
                }
            }
            throw {message:`Unauthorized-user6`}
        }
        catch (error){
            //authConnection.close()
            return res.status(400).send(error)
        }    
    }    
}

module.exports=checkUserLevel

