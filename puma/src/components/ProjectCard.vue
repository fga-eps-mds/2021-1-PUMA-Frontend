<template>
  <div v-if='is_last' class='projectLast'>
    <div class='text'>
      <div class='cardLast'>
        <div>
          <p>+</p>
        </div>
        <p>vamos de next</p>
      </div>
    </div>
  </div>

  <div v-else class='projectCard'>
  <img class='picture' alt='projPicture' :src='picture'>
    <div class='text'>
      <div class='cardTitle'>
        {{ title }}
      </div>
      <div class='expectedResult'>
        {{ expectedResult }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['picture', 'title', 'expectedResult', 'font-family', 'is_last'],
  created() {
    console.log(this.picture);
  },
};
</script>

<style>
.projectCard {
  height: 225px;
  width: 349px;
  border: 0.1em solid black;
  border-radius: 0.8em;
}

.projectLast {
  height: 225px;
  width: 349px;
  border: 0.1em solid black;
  border-radius: 0.8em;
  background-color: #15355E;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin-left: 15px;
  margin-right: 15px;

  color: #787878;
  font-family: rubik, Sans-serif;
  text-align: left;

  overflow: hidden;
  max-height: 60px;
}

.cardTitle {
  display: flex;
  flex-direction: line;
  font-size: 19px;
  justify-content: flex-start;
}

.cardLast {
  display: flex;
  flex-direction: column;
  font-size: 19px;
  justify-content: center;
  color: #ffffff;
}

.expectedResult {
  margin-top: 5px;
  display: flex;
  flex-direction: line;
  font-weight: 300;
  font-size: 14px;
  margin-right: 25px;
}

.picture {
  width: 350px;
  height: 154px;
  margin-top: -0.02em;
  margin-left: -0.02em;
  object-fit: cover;
  border-top-left-radius: 0.8em;
  border-top-right-radius: 0.8em;
}
</style>
