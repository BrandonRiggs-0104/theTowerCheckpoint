import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { valuesService } from "./ValuesService.js";

class CommentsService{
  async createComments(newComment){
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async removeComments(commentId, userId){
  const comment = await dbContext.Comments.findById(commentId)
  if(!comment){
    throw new BadRequest('no comment....')
  }
  if(comment.creatorId.toString() != userId){
    throw new Forbidden('Not yo comment foo')
  }
  await comment.remove()
  return `comment deleted`
}

  async getAllComments(query = {}) {
    const comment = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comment
  }
}


export const commentsService = new CommentsService()