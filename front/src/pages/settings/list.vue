<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="$text('Basic Admin')" eb-back-link="Back"> </eb-navbar>
    <f7-list v-if="functionsAll">
      <eb-list-item v-for="item of functions" :key="item.id" link="#" :eb-href="getFunction(item).actionPath" :title="getFunctionTitle(item)">
      </eb-list-item>
    </f7-list>
  </eb-page>
</template>
<script>
const ebFunctions = Vue.prototype.$meta.module.get('a-base').options.mixins.ebFunctions;
export default {
  mixins: [ebFunctions],
  data() {
    return {
      functions: null,
    };
  },
  created() {
    this.__loadFunctions();
  },
  methods: {
    __loadFunctions() {
      const functions = [
        { module: 'a-baseadmin', name: 'user' },
        { module: 'a-baseadmin', name: 'role' },
        { module: 'a-baseadmin', name: 'atomRight' },
        { module: 'a-baseadmin', name: 'functionRight' },
        { module: 'a-baseadmin', name: 'menu' },
        { module: 'a-baseadmin', name: 'auth' },
      ];
      this.$api.post('/a/base/function/check', { functions }).then(data => {
        this.functions = data.filter(item => item.passed);
      });
    },
  },
};

</script>
