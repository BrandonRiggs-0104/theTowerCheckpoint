<template>
  <div class="card elevation-1">
    <div class="card">
      <div class="row" v-for="c in comments" :key="c.id">
        <div class="mt-2">
          <img :src="c.creator.picture" :title="c.creator.name" height="30" class="rounded-circle" alt="creator image">
          {{ c.body }} - {{ c.creator.name }} <i class="mdi mdi-delete selectable text-danger" @click="deleteComment(c)"
            title="Delete Comment"></i>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="createComment">
        <div class="mb-3">
          <label for="comment" class="form-label">Leave A Comment:</label>
          <textarea v-model="editable.body" class="form-control" id="comment" rows="3" placeholder="Tell us..."
            required></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-primary" title="Add Comment">Add Comment</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
// import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      comments: computed(() => AppState.comments),
      async createComment() {
        try {
          if (!AppState.account.id) {
            throw new Error('Log in first silly!')
          }
          editable.value.eventId = route.params.eventId
          await commentsService.create(editable.value)
          editable.value = {}
          Pop.success("Thanks for sharing")
        }
        catch (error) {
          Pop.error(error)
        }
      },
      async deleteComment(c) {
        try {
          if (c.creator.id !== AppState.account.id) {
            throw new Error("Did you even write this bruh?")
          }
          const yes = await Pop.confirm("hmm..")
          if (!yes) {
            return;
          }
          await commentsService.deleteComment(c.id)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>
  
<style scoped lang="scss"></style>