<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <input class="form-control border-input"
           v-bind="$attrs"
           :name="name"
           :value="value"
           @input="$emit('changeValue', $event.target.value, name)"
           v-on="$listeners">
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      value: [String, Number],
      label: String,
      name: String
    }
  }

</script>
<style>

</style>
