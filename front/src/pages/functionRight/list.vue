<template>
  <eb-page>
    <eb-navbar large largeTransparent :title="pageTitle" eb-back-link="Back"></eb-navbar>
    <role-list ref="roleList" :roleIdStart="roleIdStart" @node:click="onNodeClick"></role-list>
  </eb-page>
</template>
<script>
import roleList from '../../components/role/list.vue';
const _types = ['Function', 'Menu', 'Panel', 'Widget'];
export default {
  components: {
    roleList,
  },
  data() {
    return {
      menu: parseInt(this.$f7route.query.menu),
      roleIdStart: parseInt(this.$f7route.query.roleIdStart),
    };
  },
  computed: {
    tree() {
      return this.$refs.roleList.tree;
    },
    pageTitle() {
      return this.$text(`${_types[this.menu]} Right Management`);
    },
  },
  methods: {
    onNodeClick(node) {
      this.$view.navigate(`/a/baseadmin/functionRight/edit?roleId=${node.id}&menu=${this.menu}`);
    },
  },
};

</script>
