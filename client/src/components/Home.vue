<template>
    <div class="tabs">
            <!-- UNCOMMENT TO MAKE IT CENTER  -->
            <div style="width:100%; margin-bottom:40px;">
                <div class="stage">
                <div class="wrapper">
                    <div class="slash"></div>
                    <div class="sides">
                    <div class="side"></div>
                    <div class="side"></div>
                    <div class="side"></div>
                    <div class="side"></div>
                    </div>
                    <div class="text">
                    <div class="text--backing">Mini Wordpress</div>
                    <div class="text--left">
                        <div class="inner">Mini Wordpress</div>
                    </div>
                    <div class="text--right">
                        <div class="inner">Mini Wordpress</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div style="margin: 0 20px;">
                <div class='datepicker'>
                    <div class="datepicker-header"></div>
                    <div id="clock">
                        <p class="date">{{ date }}</p>
                        <p class="time">{{ time }}</p>
                    </div>
                </div>
            </div>
            <div style="margin: 0 20px;">
                <div class='infoArticle'>
                    <div class="infoArticle-header"></div>
                    <div id="info">
                        <p class="date">{{ myData.length }} Article Post</p>
                        <b-progress></b-progress>
                    </div>
                </div>
            </div>
        <!-- </div> -->
            <!-- <div style="over-flow:hidden; width:100%; margin-top:30px;">
                <b-message title="Upload More Article" type="is-success" has-icon aria-close-label="Close message">
                    <p style="text-align:center;">
                        Share your article with anyone. You can share it with 
                        <i class="fab fa-facebook-square"></i>
                        facebook or 
                        <i class="fab fa-twitter-square"></i>
                        twitter
                        </p>
                </b-message>
            </div> -->
    </div>
</template>

<script>
export default {
    name : 'ProjectContent',
    props: [
        'myData'
    ],
    data() {
        return {
            time: '',
            date: ''
        }
    },
    methods : {
        updateTime() {
            let date = new Date()
            let day = date.getDay()
            if(day === 0) {
                day = 'Sunday'
            } else if (day === 1) {
                day = 'Monday'
            } else if (day === 2) {
                day = 'Tuesday'
            } else if (day === 3) {
                day = 'Wednesday'
            } else if (day === 4) {
                day = 'Thursday'
            } else if (day === 5) {
                day = 'Friday'
            } else if (day === 6) {
                day = 'Saturday'
            }
            let month = date.getMonth() + 1
            let dateNumber = date.getDate()
            if (dateNumber<10){
                dateNumber = '0'+dateNumber.toString()
            }
            if (month === 1){
                month = 'January'
            } else if (month === 2) {
                month = 'February'
            } else if (month === 3) {
                month = 'March'
            } else if (month === 4) {
                month = 'April'
            } else if (month === 5) {
                month = 'May'
            } else if (month === 6) {
                month = 'June'
            } else if (month === 7) {
                month = 'July'
            } else if (month === 8) {
                month = 'August'
            } else if (month === 9) {
                month = 'September'
            } else if (month === 10) {
                month = 'October'
            } else if (month === 11) {
                month = 'November'
            } else if (month === 12) {
                month = 'December'
            }
            this.date = `${day} ${dateNumber} ${month}`
        }
    },
    created() {
        this.updateTime()

    }
}
</script>

<style scoped>
.tabs {
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
    flex-wrap: wrap;
    overflow: auto;
    height: 80vh;
}

#info {
     font-family: 'Share Tech Mono', monospace;
	 font-size: 24px;
     padding: 4px;
	 text-align: center;
	 color: #000;
     font-weight: bold;
     border-top: 1px solid #dbdbdb;
}

.datepicker {
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.2);
  /* UNCOMMENT TO MAKE IT CENTER */
  /* margin: 50px auto;
  overflow: hidden; */
}
.datepicker .datepicker-header {
  height: 250px;
  background-image: url('https://cdn.dribbble.com/users/1753667/screenshots/5521465/181108_manage.png');
  background-position: center center;
  background-size: 100%;
}
.datepicker .ui-datepicker-inline {
  padding: 30px;
}
.datepicker .ui-datepicker-header {
  text-align: center;
  padding-bottom: 1em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.infoArticle {
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.2);
  /* UNCOMMENT TO MAKE IT CENTER */
  /* margin: 50px auto;
  overflow: hidden; */
}
.infoArticle .infoArticle-header {
  height: 250px;
  background-image: url('https://cdn.dribbble.com/users/663312/screenshots/4844936/dribbble_girl.png');
  background-position: center center;
  background-size: 100%;
}


 /* ------ */
 .stage {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.wrapper {
  position: relative;
  color: #fff;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  padding-top: 0.65rem;
  padding-left: 0.5rem;
  padding-right: 0.36rem;
  padding-bottom: 0.2rem;
}
.slash {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
          transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  -webkit-transform-origin: center center;
          transform-origin: center center;
  width: 0.15rem;
  height: 145%;
  background: #fff;
  z-index: 4;
  -webkit-animation: slash 6s ease-in infinite;
          animation: slash 6s ease-in infinite;
}
.slash:before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  width: 0.75rem;
  height: 120%;
  background: #232323;
  z-index: -1;
}
.slash:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
.sides {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.sides .side {
  position: absolute;
  background: #fff;
}
.sides .side:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 0.15rem;
  -webkit-transform: translateX(-101%);
          transform: translateX(-101%);
  -webkit-animation: side-top ease 6s infinite;
          animation: side-top ease 6s infinite;
}
.sides .side:nth-child(2) {
  top: 0;
  right: 0;
  width: 0.15rem;
  height: 100%;
  -webkit-transform: translateY(-101%);
          transform: translateY(-101%);
  -webkit-animation: side-right ease 6s infinite;
          animation: side-right ease 6s infinite;
}
.sides .side:nth-child(3) {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.15rem;
  -webkit-transform: translateX(101%);
          transform: translateX(101%);
  -webkit-animation: side-bottom ease 6s infinite;
          animation: side-bottom ease 6s infinite;
}
.sides .side:nth-child(4) {
  top: 0;
  left: 0;
  width: 0.15rem;
  height: 100%;
  -webkit-transform: translateY(101%);
          transform: translateY(101%);
  -webkit-animation: side-left ease 6s infinite;
          animation: side-left ease 6s infinite;
}
.text {
  position: relative;
}
.text--backing {
  opacity: 0;
}
.text--left {
  position: absolute;
  top: 0;
  left: 0;
  width: 51%;
  height: 100%;
  overflow: hidden;
}
.text--left .inner {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
  -webkit-animation: text-left 6s ease-in-out infinite;
          animation: text-left 6s ease-in-out infinite;
}
.text--right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.text--right .inner {
  -webkit-transform: translateX(-200%);
          transform: translateX(-200%);
  -webkit-animation: text-right 6s ease-in-out infinite;
          animation: text-right 6s ease-in-out infinite;
}
@-webkit-keyframes slash {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
  6% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
  }
  13% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
  }
  16.6% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
}
@keyframes slash {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
  6% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
  }
  13% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(1);
  }
  16.6% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
            transform: translate(-50%, -50%) rotate(-24deg) scaleY(0);
  }
}
@-webkit-keyframes text-left {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
  10% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  58% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  70% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
  100% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
}
@keyframes text-left {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
  10% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  58% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  70% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
  100% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
}
@-webkit-keyframes text-right {
  0% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
  10% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
  58% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
  70% {
    -webkit-transform: translateX(-300%);
            transform: translateX(-300%);
  }
  100% {
    -webkit-transform: translateX(-300%);
            transform: translateX(-300%);
  }
}
@keyframes text-right {
  0% {
    -webkit-transform: translateX(-200%);
            transform: translateX(-200%);
  }
  10% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
  58% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
  70% {
    -webkit-transform: translateX(-300%);
            transform: translateX(-300%);
  }
  100% {
    -webkit-transform: translateX(-300%);
            transform: translateX(-300%);
  }
}
@-webkit-keyframes side-top {
  0%, 14% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
  24%, 55% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  65% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
  100% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
}
@keyframes side-top {
  0%, 14% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
  24%, 55% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  65% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
  100% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
}
@-webkit-keyframes side-right {
  0%, 14%, 23% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
  30%, 62% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  72% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
  100% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
}
@keyframes side-right {
  0%, 14%, 23% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
  30%, 62% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  72% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
  100% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
}
@-webkit-keyframes side-bottom {
  0%, 14%, 24%, 28% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
  37%, 70% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  79% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
  100% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
}
@keyframes side-bottom {
  0%, 14%, 24%, 28% {
    -webkit-transform: translateX(101%);
            transform: translateX(101%);
  }
  37%, 70% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  79% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
  100% {
    -webkit-transform: translateX(-101%);
            transform: translateX(-101%);
  }
}
@-webkit-keyframes side-left {
  0%, 14%, 24%, 34%, 35% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
  44%, 79% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  86% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
  100% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
}
@keyframes side-left {
  0%, 14%, 24%, 34%, 35% {
    -webkit-transform: translateY(101%);
            transform: translateY(101%);
  }
  44%, 79% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  86% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
  100% {
    -webkit-transform: translateY(-101%);
            transform: translateY(-101%);
  }
}

</style>