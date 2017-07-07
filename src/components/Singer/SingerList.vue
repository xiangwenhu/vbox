<template>
  <div class="mod_singer_list">

    <div v-for="(singerItem,index) in singers">
      <div v-if='index%2 == 0' class="box">
        <figure class="box-item align-center" v-for="(singer,i) in [singerItem,singers[index+1]]">

          <router-link :to="{name:'SingerDetailView',params:{singermid:singer.Fsinger_mid}}">
            <img class="singer_list__pic" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=2592000';this.onerror=null;"
              :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000' + singer.Fsinger_mid + '.jpg?max_age=2592000'" alt="Fsinger_name">
          </router-link>

          <figcaption>
            <h3 class="singer_list__title">
              <router-link class="tit" :to="{name:'SingerDetailView',params:{singermid:singer.Fsinger_mid}}">{{singer.Fsinger_name}}</router-link>
            </h3>
          </figcaption>
        </figure>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'singer-list',
    props: ['singers']
  }

</script>


<style scoped>
  .singer_list__pic {
    border-radius: 999px
  }

  .box {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: space-between;
  }

  .box-item {
    flex-basis: 100%;
    justify-content: center;
    flex: 1;
    background-color: #fbfbfd;
    margin: 0 5%;
    max-width: 50%
  }

  .box-item img {
    width: 100%
  }

  .singer_list__title a {
    color: #333;   
    font-weight: normal
  }
</style>