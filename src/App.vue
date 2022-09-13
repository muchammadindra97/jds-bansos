<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container class="px-0">
        <v-toolbar-title>Bansos Covid-19</v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <FormulirPenerima v-if="isFormulirMode" @submit="handleFormulirPenerimaSubmit" />
      <PreviewPenerima v-else :data="formulirData" @back="handlePreviewPenerimaBack" />
    </v-main>
  </v-app>
</template>

<script>
import FormulirPenerima from "@/components/FormulirPenerima";
import PreviewPenerima from "@/components/PreviewPenerima";

export default {
  name: 'App',
  components: {
    PreviewPenerima,
    FormulirPenerima
  },
  data() {
    return {
      isFormulirMode: true,
      formulirData: null
    }
  },
  methods: {
    handleFormulirPenerimaSubmit(value) {
      this.isFormulirMode = false;
      this.formulirData = value;
      window.scrollTo(0,0);
    },
    handlePreviewPenerimaBack() {
      this.isFormulirMode = true;
      this.formulirData = null;
      window.scrollTo(0,0);
    }
  }
};
</script>
