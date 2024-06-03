<template>
    <section class="comment_section">
        <div class="comment_section">
            <h2 class="section_title">Comments</h2>
            <form class="section_form">
                <div class="form_container">
                    <div class="container_image">
                        <font-awesome-icon :icon="['fas', 'user']" />
                    </div>
                    <input type="text" class="container_input" placeholder="Write something...">
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
                    <div class="container_main">
                        <div class="main_header">siema</div>
                        <div class="main_con">kozackie</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>