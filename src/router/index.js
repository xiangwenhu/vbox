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
import DissHomeView from '../views/DissHomeView'
import DissCategorysListView from '../views/DissCategorysListView'

import MVView from '../views/MVView'
import MVDetailView from '../views/MVDetailView'
import MVPlayerView from '../views/MVPlayerView'

import SearchView from '../views/SearchView'
import SearchResultView from '../views/SearchResultView'

import MeView from '../views/MeView'
import MeHomeView from '../views/MeHomeView'
import MeRecorder from '../views/MeRecorder'

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
          component: DissView,
          children: [
            {
              path: '',
              redirect: '/pages/diss/home'
            },
            {
              path: 'home',
              name: 'DissHomeView',
              component: DissHomeView
            },
            {
              path: 'category/:categoryId',
              name: 'DissCategorysListView',
              component: DissCategorysListView
            }
          ]
        },
        {
          path: 'mv',
          name: 'MVView',
          component: MVView
        }, {
          path: 'mv/:vid',
          name: 'MVDetailView',
          component: MVDetailView
        }
      ]
    },
    {
      path: '/mvplayer/:vid',
      name: 'MVPlayerView',
      component: MVPlayerView
    },
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView,
      children: [
        {
          path: ':keyWords',
          name: 'SearchResultView',
          component: SearchResultView
        }]
    },
    {
      path: '/me',
      component: MeView,
      children: [{
        path: '',
        redirect: '/me/home'
      }, {
        path: 'home',
        name: 'MeHome',
        component: MeHomeView
      }, {
        path: 'recorder',
        name: 'MeRecorder',
        component: MeRecorder
      }]

    }
  ]
})
