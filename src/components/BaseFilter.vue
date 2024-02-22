<template>
  <div class="filter">
    <span>Filter by {{ model }}:</span>
    <ul class="list">
      <li v-for="option in data" :key="model + option" class="filter-option">
        <input
          class="checkbox"
          type="radio"
          :id="model + '-' + option"
          :value="option === 'all' ? '' : option"
          v-model="selected"
        />
        <label class="label" :for="model + '-' + option">{{ option }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: [`setFilter`],
  props: {
    model: { type: String, required: true },
    data: { type: Array, required: true },
    value: { type: String, required: true }
  },
  data() {
    return {
      selected: this.$props.value
    }
  },

  watch: {
    selected() {
      this.$emit(`setFilter`, this.selected)
    },
    value() {
      this.selected = this.$props.value
      //   console.log(this.$props.value)
      //   console.log(this.selected)
    }
  }
}
</script>

<style scoped>
.list {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.filter {
  display: flex;
  gap: 15px;
  align-items: center;
  color: whitesmoke;
  margin-bottom: 10px;
}
.checkbox {
  display: none;
  opacity: 0;
  visibility: hidden;
  height: 0px;
  width: 0px;
}
.label {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  font-size: 105%;
  transition: all 0.75s;
  display: block;
  min-width: 55px;
  text-align: center;
  text-transform: capitalize;
}
.checkbox:checked + .label {
  color: goldenrod;
  border-color: goldenrod;
}
</style>
