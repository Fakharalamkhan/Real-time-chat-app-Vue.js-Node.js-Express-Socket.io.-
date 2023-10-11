<script setup>
</script>

<template>
  <div class="text-center">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Welcome to the ChattyChat </h1>
        <img alt="TU logo" class="logo" src="../assets/tud_logo.png"/>
        <p class="lead"> When you click on the button below, you wiII see your component </p>
        <p class="lead">
          <RouterLink class="btn btn-lg btn-primary" to="/chatty">Your Chatty Chat Component</RouterLink>
        </p>
      </main>
    </div>
  </div>
</template>

<style>
.logo {
  width:95%
}
</style>