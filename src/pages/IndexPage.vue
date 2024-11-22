<template>
  <LoginForm />
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from "src/components/LoginPage.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    LoginForm,
  },
});
</script>
