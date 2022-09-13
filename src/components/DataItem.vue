<template>
  <v-row dense>
    <v-col cols="12" sm="4"><span class="font-weight-bold blue--text text--base">{{ label }}</span></v-col>
    <v-col cols="auto" class="d-none d-sm-block">:</v-col>
    <v-col cols="12" sm>
      <div>{{ value }}</div>
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DataItem",
  props: {
    label: String,
    value: String
  }
}
</script>
