<template>
  <div>
  <b-container class="px-4 pl-md-0 pr-md-0">
    <img src="https://picsum.photos/1000/500/?image=1" loading="lazy">
    <p class="ml-1 mt-4 mb-0 text-secondary"><small>By <span class="text-info">Dipadana</span> - May 20, 2019</small></p>
    <h1 class="mt-1">Death Stranding PC Rilis di EGS dan Steam</h1>
    <div>
      <b-badge class="ml-1" variant="info">javascript</b-badge>
      <b-badge class="ml-1" variant="info">php</b-badge>
      <b-badge class="ml-1" variant="info">ruby</b-badge>
    </div>
    <b-row class="mt-4">
      <b-col cols="12" md="8">
        <div class="">
          <p>
            Kepastian Death Stranding untuk rilis di PC beberapa waktu lalu tentu saja disambut baik dengan tangan terbuka oleh banyak gamer PC. Ini seolah menghapuskan beragam kekhawatiran yang sempat muncul soal absennya pembicaraan soal versi PC selama beberapa tahun terakhir ini. Namun rasa cemas belum berhenti ketika konfirmasi tersebut mengemuka. Penunjukan 505 Games sebagai publisher yang bertanggung jawab untuk proses distribusi mengembalikan trauma eksklusivitas Epic Games Store (EGS) yang sempat mereka terapkan untuk Control beberapa bulan yang lalu. Berita baik untuk gamer yang lebih mengandalkan Steam? Ketakutan tersebut tidak beralasan.
          </p>
          <p>
            Walaupun tanggal rilis resmi belum ditentukan, 505 Games akhirnya mengkonfirmasikan bahwa Death Stranding versi PC akan dilepas di Steam dan Epic Games Store dengan hari rilis yang sama. Bahkan mereka sudah membuka kesempatan pre-order dari hari ini, dengan harga game di Steam yang dibanderol sekitar 829 ribu Rupiah dan Epic Games Store di angka sekitar 850 ribu Rupiah berdasarkan angka konversi USD-IDR pada saat berita ini ditulis. Informasi terkait spesifikasi PC seperti apa yang perlu dipersiapkan, sayangnya belum meluncur.
          </p>
        </div>
      </b-col>
      <b-col md="4">
        <Taglist
          class="pl-0 mt-3 mb-2 pl-md-5"
          :tags="[{name:'javascript',count:10},{name:'php',count:5},{name:'ruby',count:9}]"
        ></Taglist>
      </b-col>
    </b-row>
  </b-container>
  <Footeritem class="mt-4 mt-md-4"></Footeritem>
  </div>
</template>

<script>
import Taglist from '../components/Taglist'
import Footeritem from '../components/Footeritem'

export default {
  name:'Article',
  components:{
    Taglist,
    Footeritem
  },
  mounted () {
    window.scrollTo(0, 0);
  }
}
</script>

<style>
  img{
    width: 100%;
    height: auto;
  }
</style>