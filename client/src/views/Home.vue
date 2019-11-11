<template>
  <div class="container text-center my-auto masthead">
            <h1 class="mb-1" style="font-family: 'Dancing Script', cursive;">Make The World Know Who You Are</h1>
            <h3 class="mb-5">
              <em></em>
            </h3>
            <div class="btn-center">
              <button class="btn btn2" @click="$emit('showLogin')" >Get Started</button>
            </div>
  </div>
</template>

<script>

export default {
    components: {

    }
}
</script>

<style scoped>

.masthead {
  min-height: 36rem;
  position: relative;
  display: table;
  width: 100%;
  height: auto;
  padding-top: 12rem;
  padding-bottom: 8rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.masthead h1 {
  font-weight: 700;
  font-size: 4rem;
  margin: 0;
  padding: 0;
  color:yellow;
}

.btn-center{
  text-align: center;
  margin-top: 100px;
}
.btn{
  border: 5px double rgb(240, 235, 235);
  background: none;
  padding: 10px 20px;
  font-size: 20px;
  font-family: "montserrat";
  cursor: pointer;
  margin: 10px;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
}
.btn1,.btn2{
  color: #fcff2d;
}
.btn3,.btn4{
  color: #fff;
}
.btn1:hover,.btn2:hover{
  color: rgb(3, 3, 3);
}
.btn3:hover,.btn4:hover{
  color: #3498db;
}
.btn::before{
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background: #cfbd16;
  z-index: -1;
  transition: 0.8s;
}
.btn1::before,.btn3::before{
  top: 0;
  border-radius: 0 0 50% 50%;
}
.btn2::before,.btn4::before{
  bottom: 0;
  border-radius: 50% 50% 0 0;
}
.btn3::before,.btn4::before{
  height: 180%;
}
.btn1:hover::before,.btn2:hover::before{
  height: 180%;
}
.btn3:hover::before,.btn4:hover::before{
  height: 0%;
}


</style>>

