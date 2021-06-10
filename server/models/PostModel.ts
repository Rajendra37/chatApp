import mongoose from 'mongoose'

const{ObjectId}=mongoose.Schema.Types
const PostSchema=new mongoose.Schema({
        Postbody:{
            type:String,
            required:true
        },
        PostPhoto:{
                type:String,
                required:true
        },
        likes:[{
                type:ObjectId,
                ref:"user"
        }],
        comments:[{
                text:String,
                        PostedBy:{
                      type:ObjectId,
                      ref:"user"  
                }
        }],
        PostedBy:{
                type:ObjectId,
                ref:"user"
        }
      

})


const postModel:any=mongoose.model('Post',PostSchema)
export default postModel