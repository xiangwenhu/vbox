import Vue from 'vue'
import Router from 'vue-router'

import PagesView from '../views/PagesView'
import HomeView from '../views/HomeView'

import SingerView from '../views/SingerView'
import SingerSearchView from '../views/SingerSearchView'
import SingerDetailView from '../views/SingerDetailView'

import AlbumView from '../views/AlbumView'
import AlbumSearchView from '../views/AlbumSearchView'
import AlbumDetailView from '../views/AlbumDetailView'

import TopListView from '../views/TopListView'
import TopListHomeView from '../views/TopListHomeView'
import TopListDetailView from '../views/TopListDetailView'

import DissView from '../views/DissView'

import MVView from '../views/MVView'
import MVDetailView from '../views/MVDetailView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pages/'
    },
    {
      path: '/pages',
      component: PagesView,
      children: [
        {
          path: '',
          redirect: '/pages/home'
        },
        {
          path: 'home',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: 'singer',
          component: SingerView,
          children: [
            {
              path: '',
              redirect: '/pages/singer/search'
            },
            {
              path: 'search',
              name: 'SingerSearchView',
              component: SingerSearchView
            },
            {
              path: 'detail/:singermid',
              name: 'SingerDetailView',
              component: SingerDetailView
            }
          ]
        },
        {
          path: 'album',
          component: AlbumView,
          children: [
            {
              path: '',
              redirect: '/pages/album/search'
            },
            {
              path: 'search',
              name: 'AlbumSearchView',
              component: AlbumSearchView
            },
            {
              path: 'detail/:albummid',
              name: 'AlbumDetailView',
              component: AlbumDetailView
            }
          ]
        },
        {
          path: 'toplist',
          name: 'TopListView',
          component: TopListView,
          children: [
            {
              path: '',
              redirect: '/pages/toplist/home'
            },
            {
              path: 'home',
              name: 'TopListHomeView',
              component: TopListHomeView
            },
            {
              path: 'detail/:topid',
              name: 'TopListDetailView',
              component: TopListDetailView
            }
          ]
        },
        {
          path: 'diss',
          name: 'DissView',
          component: DissView
        },
        {
          path: 'mv',
          name: 'MVView',
          component: MVView
        }, {
          path: 'mv/:vid',
          name: 'MVDetailView',
          component: MVDetailView
        }]
    }

  ]
})
