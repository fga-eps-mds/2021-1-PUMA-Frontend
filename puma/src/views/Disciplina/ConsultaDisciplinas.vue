<template>
  <div>
    <div class="v163_221">
      <div class="v146_1914"  v-for="subject in subjects.val" :key="subject.subjectid">
        <div class="v146_1915">
          <div class="v146_1916"
                @click="aux">
            <p> {{ subject.name }}</p>
            <span class="v146_1920">{{ subject.coursesyllabus }}</span>
          </div>
        </div>
        <div class="v146_1917">
          <div class="v146_1918"></div>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
import SubjectService from '../../services/subjectService';

const subjectService = new SubjectService();

export default {
  created() {
    subjectService.getSubjects().then((response) => {
      console.log(response);
      response.data.data.response.forEach((subject) => {
        // eslint-disable-next-line max-len
        console.log(subject);
        // eslint-disable-next-line max-len
        this.subjects.val.push({ name: subject.name, coursesyllabus: subject.coursesyllabus, subjectid: subject.subjectid });
      });
      console.log(this.subjects.val);
    });
  },
  methods: {
    aux() {
      console.log(this.subjects);
    },
  },
  data() {
    return {
      subjects: { val: [], isValid: true },
    };
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  font-size: 14px;
}

.v163_221 {
  width: 100%;
  height: 1080px;
  background-size: cover;
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

.v146_1914 {
  width: 349px;
  height: 225px;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 224px;
  left: 112px;
  overflow: hidden;
}
.v146_1915 {
  width: 349px;
  height: 71px;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 154px;
  left: 0px;
  overflow: hidden;
}
.v146_1916 {
  width: 349px;
  height: 71px;
  background: rgba(255,255,255,1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  border: 1px solid rgba(120,120,120,1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
}
.v146_1917 {
  width: 349px;
  height: 154px;
  background-size: cover;
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v146_1918 {
  width: 349px;
  height: 154px;
  background: rgba(21,53,94,1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}

</style>
