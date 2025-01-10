<template>
<div class="container">
    <p class="text-write text-h5 text-black font-weight-bold">
      Bonjour à tous et Bienvenue sur mon portfolio ! 
    </p>
  </div>
  <p class="text-h5 text-black font-weight-bold">
     Je m'appelle Jérémy Weltmann et je suis Développeur Web Full Stack.
    </p>
</template>

<style lang="css">
.container{
  display: inline-block;
}
.text-write{
  border-right: 4px solid #333333;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  animation: 
    typing 4s steps(47),
    cursor .10s step-end  alternate;
}

@keyframes cursor{
  50% {border-color: transparent;}
}

@keyframes typing{
  from{width: 0;}
}
</style>