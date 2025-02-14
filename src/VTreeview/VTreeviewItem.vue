<template>
  <li class="tree-node" >
    <span class="toggle-icon" :class="{ 'empty-toggle': !isFolder }" :key="open" @click="toggle">
      <i v-if="isFolder" :class="{'fa fa-caret-down' : this.open, 'fa fa-caret-right' : !this.open}" ></i>
    </span>    
    <span class="tree-icon" :class="{ 'empty-toggle': !icon }" :key="icon">
      <i v-if="icon" class="far" :class="icon" ></i>
    </span>
    <input type="radio" name="rad" v-model="checked" :id="model.id" :value="model.id">        
    <label v-show="!edit" class="tree-text" :class="{ 'searched-text': isSearchText }" :for="model.id" v-on:dblclick="predbclick" @contextmenu.prevent="showContextMenu" key="label">{{model.text}}</label>    
    <input v-show="edit" ref="title" class="tree-text" v-model="model.text" :placeholder="model.text" key="input" @blur="blur" @keyup.enter="blur">
    <div class="tree-children">
      <ul v-show="open" v-if="isFolder">
        <v-treeview-item v-for="child in model.children" :key="child.id" 
        :model="child" :treeTypes="treeTypes" :openAll="openAll" @addNode="addNode"
        @selected="selected" @dodbclick="dodbclick" :searchText="searchText" @openTree="openTree">
        </v-treeview-item>      
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: 'v-treeview-item',
  props: ['model', 'treeTypes', 'openAll', 'searchText'],
  data() {
    return {
      open: false,
      checked: null,
      edit: false,
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },
    icon() {
      return this.getTypeRule(this.model.type).icon
    },
    isSearchText() {
      if (this.searchText && this.searchText != '') {
        if (
          this.model.text
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase()) !== -1
        ) {
          this.openTree(this)
          return true
        } else return false
      }
    }
  },
  methods: {
    getTypeRule(type) {
      var typeRule = this.treeTypes.filter(t => t.type == type)[0]
      return typeRule
    },
    blur() {
      this.edit = false
    },
    selected(node) {
      this.checked = null
      this.checked = this.model.id
      this.$emit('selected', node)
    },
    dodbclick(node) {
      this.checked = null
      this.checked = this.model.id
      this.$emit('dodbclick', node)
    },
    openTree(node) {
      this.open = true
      this.$emit('openTree', node)
    },
    addNode(newNode) {
      var typeRule = this.getTypeRule(this.model.type)

      if (typeRule.valid_children.indexOf(newNode.type) > -1) {
        this.model.children.push(newNode)
      }
    },
    editName() {
      this.edit = true
      this.$nextTick(() => this.$refs.title.focus())
    },
    showContextMenu(e) {
      e.preventDefault()
      this.open = true
      this.selected(this)
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
      this.selected(this)
    },
    predbclick() {
      this.dodbclick(this)
    }
  },
  created() {
    if (this.model.id == null) {
      this.editName()
    }
    this.open = this.openAll
  },
  watch: {
    openAll(openAll) {
      this.open = openAll
    }
  }
}
</script>

<style scoped>
ul {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
}
ul .tree-node {
  display: block;
  padding-left: 33px;
}
.toggle-icon {
  display: inline-block;
  width: 25px;
  position: absolute;
  left: 0;
  padding: 0 7.5px;
  z-index: 99;
  cursor: pointer;
}
ul .tree-children {
    margin-left: -15px;
}
ul .tree-node :hover:before {
  background: rgba(190, 235, 255, 0.3);
}

ul .tree-node input[type='radio'] {
  display: none;
}
ul .tree-node input[type='radio']:checked + label:before {
  background: rgba(83, 215, 220, 0.3);
}

ul label {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
ul label:before {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  content: '';
  height: 21px;
  left: 0;
  position: absolute;
  right: 0;
}

.searched-text {
  font-style: italic;
  color: #cc0000;
}
</style>
