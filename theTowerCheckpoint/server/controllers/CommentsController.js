import {Auth0Provider} from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController.js"

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComments)
    .delete('/:eventId', this.removeComments)
  }
async createComments(req, res, next){
  try {
    req.body.creatorId = req.userInfo.id
    const comment = await commentsService.createComments(req.body)
    return res.send(comment)
  } catch (error) {
    next(error)
  }
}

async removeComments(req, res, next){
  try {
    const comment = await commentsService.removeComments(req.params.eventId, req.userInfo.id)
    return res.send(comment)
  } catch (error) {
    next(error)
  }
}
}