<template>
  <div>
    <UtilsNavbar />
    <div class="container py-5">
      <Nuxt />
    </div>
  </div>
</template>

<style>
* {
  font-family: Poppins;
}
body {
  background-color: #fffbfe !important;

}

body {
  min-height: 75rem;
  padding-top: 4.5rem;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

</style>
