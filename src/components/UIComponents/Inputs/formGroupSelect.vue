<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <select class="form-control border-input"
      v-bind="$attrs"
      :name="name"
      @change="$emit('changeValue', $event.target.value, name)"
      v-on="$listeners"
    >
      <option value="none"> {{ label }}</option>
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option._id"
        :selected="selected === option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      selected: String,
      label: String,
      name: String,
      options: Array
    }
  }

</script>
<style>

</style>
