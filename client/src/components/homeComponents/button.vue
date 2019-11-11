<template>
    <button class="btn btn2">Hover Me</button>
</template>

<script>
export default {

}
</script>

<style>

.btn{
  border: 3px double rgb(0, 0, 0);
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

.btn2{
  color:wheat;
}

.btn2:hover{
  color: rgb(241, 245, 38);
}

.btn::before{
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background: #3498db;
  z-index: -1;
  transition: 0.8s;
}

.btn1::before {
  top: 0;
  border-radius: 0 0 50% 50%;
}

.btn2:hover::before{
  height: 180%;
}

</style>