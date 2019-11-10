<template>
    <div class="tabs is-centered is-boxed">
        <!-- <ul>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-upload"></i></span>
                <span>Published</span>
            </a>
            </li>
            <li class="is-active">
            <a>
                <span class="icon is-small"><i class="fas fa-drafting-compass"></i></span>
                <span>Drafts</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-calendar-alt"></i></span>
                <span>Scheduled</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                <span>Trash</span>
            </a>
            </li>
        </ul> -->
        <!-- <div> -->
            <!-- UNCOMMENT TO MAKE IT CENTER  -->
            <div class='datepicker'>
                <div class="datepicker-header"></div>
                <div id="clock">
                    <p class="date">{{ date }}</p>
                    <p class="time">{{ time }}</p>
                </div>
            </div>
            <div>
                
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    name : 'ProjectContent',
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
                day = 'Minggu'
            } else if (day === 1) {
                day = 'Senin'
            } else if (day === 2) {
                day = 'Selasa'
            } else if (day === 3) {
                day = 'Rabu'
            } else if (day === 4) {
                day = 'Kamis'
            } else if (day === 5) {
                day = 'Jumat'
            } else if (day === 6) {
                day = 'Sabtu'
            }
            let month = date.getMonth() + 1
            let dateNumber = date.getDate()
            if (dateNumber<10){
                dateNumber = '0'+dateNumber.toString()
            }
            if (month === 1){
                month = 'Januari'
            } else if (month === 2) {
                month = 'Februari'
            } else if (month === 3) {
                month = 'Maret'
            } else if (month === 4) {
                month = 'April'
            } else if (month === 5) {
                month = 'Mei'
            } else if (month === 6) {
                month = 'Juni'
            } else if (month === 7) {
                month = 'Juli'
            } else if (month === 8) {
                month = 'Agustus'
            } else if (month === 9) {
                month = 'September'
            } else if (month === 10) {
                month = 'Oktober'
            } else if (month === 11) {
                month = 'November'
            } else if (month === 12) {
                month = 'Desember'
            }
            this.date = `${day} ${dateNumber} ${month}`
        }
    },
    created() {
        this.updateTime()

    }
}
</script>

<style >


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
  background-image: url('https://cdn.dribbble.com/users/3178178/screenshots/6346366/lifeguard_on_duty.jpg');
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
/* .datepicker .ui-datepicker-header .ui-datepicker-prev, .datepicker .ui-datepicker-header .ui-datepicker-next {
  display: inline;
  float: left;
  cursor: pointer;
  font-size: 1.4em;
  padding: 0 10px;
  margin-top: -10px;
  color: #CCC;
}
.datepicker .ui-datepicker-header .ui-datepicker-next {
  float: right;
}
.datepicker .ui-datepicker-calendar {
  width: 100%;
  text-align: center;
}
.datepicker .ui-datepicker-calendar thead {
  color: #CCC;
}
.datepicker .ui-datepicker-calendar tr th, .datepicker .ui-datepicker-calendar tr td {
  padding-bottom: 0.5em;
}
.datepicker .ui-datepicker-calendar a {
  color: #444;
  text-decoration: none;
  display: block;
  margin: 0 auto;
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
}
.datepicker .ui-datepicker-calendar .ui-state-highlight {
  border-color: #D24D57;
  color: #D24D57;
} */

 
</style>