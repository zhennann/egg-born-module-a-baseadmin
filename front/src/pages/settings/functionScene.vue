<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="getPageTitle()" eb-back-link="Back"> </eb-navbar>
    <f7-list class="eb-admin-function-scene">
      <eb-list-item v-for="(item,index) of functionScenes" :key="item.id" :title="item.titleLocale" :badge="index+1" link="#" :eb-href="`function/sceneItem?sceneMenu=${sceneMenu}&sceneId=${item.id}`" v-eb-dragdrop="getDragdropContext(item)">
      </eb-list-item>
    </f7-list>
  </eb-page>
</template>
<script>
import Vue from 'vue';
export default {
  data() {
    return {
      sceneMenu: parseInt(this.$f7route.query.sceneMenu),
      functionScenes: null,
      dragdropScene: Vue.prototype.$meta.util.nextId('dragdrop'),
    };
  },
  created() {
    this.__functionScenesLoad();
  },
  methods: {
    getPageTitle() {
      if (this.sceneMenu === 0) return this.$text('Function Management');
      if (this.sceneMenu === 1) return this.$text('Menu Management');
    },
    getDragdropContext(item) {
      return {
        scene: this.dragdropScene,
        item,
        onDragStart: this.onDragStart,
        onDropElement: this.onDropElement,
        onDragDone: this.onDragDone,
      }
    },
    onDragStart({ $el, context, dragElement }) {
      const tooltip = context.item.titleLocale;
      return { tooltip };
    },
    onDropElement({ $el, context, dragElement, dragContext }) {
      const indexDrop = this.__getSceneIndex(context.item);
      const indexDrag = this.__getSceneIndex(dragContext.item);
      if (indexDrop === indexDrag || indexDrop == indexDrag + 1) return null;
      // dropElement
      const dropElement = $el;
      // tooltip
      const tooltip = context.item.titleLocale;
      // ok
      return { dropElement, tooltip };
    },
    onDragDone({ $el, context, dragElement, dropElement, dropContext }) {
      const indexDrag = this.__getSceneIndex(context.item);
      this.functionScenes.splice(indexDrag, 1);
      const indexDrop = this.__getSceneIndex(dropContext.item);
      this.functionScenes.splice(indexDrop, 0, context.item);
      // save
      this.__functionScenesSaveSortings();
    },
    __getSceneIndex(item) {
      return this.functionScenes.findIndex(_item => _item.id === item.id);
    },
    __functionScenesLoad() {
      this.$api.post('function/scenesLoad', { sceneMenu: this.sceneMenu }).then(data => {
        this.functionScenes = data;
      });
    },
    __functionScenesSaveSortings() {
      const sortings = this.functionScenes.map((item, index) => {
        return { id: item.id, sorting: index + 1 }
      });
      this.$api.post('function/scenesSaveSortings', { sceneMenu: this.sceneMenu, sortings }).then(() => {
        this.$view.toast.show();
      });
    }
  },
};

</script>
