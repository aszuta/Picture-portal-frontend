<template>
    <section class="comment_section">
        <div class="comment_section">
            <h2 class="section_title">Comments</h2>
            <form  @submit.prevent="submit()" method="post" class="section_form">
                <div class="form_container">
                    <div class="container_image">
                        <font-awesome-icon :icon="['fas', 'user']" />
                    </div>
                    <!-- <input type="text" class="container_input" placeholder="Write something..."> -->
                    <Input v-model="form.content" type="text" name="comment" is-comment/>
                    <button class="container_button">
                        <font-awesome-icon :icon="['fas', 'paper-plane']" />
                    </button>
                </div>
            </form>
            <div class="section_comments">
                <div class="comment_container">
                    <div class="container_image">
                        <font-awesome-icon :icon="['fas', 'user']" />
                    </div>
                    <div v-for="comment in props.comments" :key="comment.id" class="container_main">
                        <div class="main_header">{{ comment.name }}</div>
                        <div class="main_con">{{ comment.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    postId: String,
    comments: Object
});

const form = {
    postId: props.postId,
    name: 'test1',
    content: ''
};
const api = useApi();

async function submit() {
    try {
        await api(`/api/comment/${props.postId}`, {
            method: 'POST',
            body: form.value
        });
    } catch (error) {
        console.log(error);
    }
};
</script>