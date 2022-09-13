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
      <FormulirPenerima v-if="isFormulirMode" @submit="handleFormulirPenerimaSubmit" @notification="handleFormulirPenerimaNotification" />
      <PreviewPenerima v-else :data="formulirData" @back="handlePreviewPenerimaBack" />
    </v-main>
    <v-snackbar
        v-model="snackbar.isShow"
        app
        multi-line
        :color="snackbar.isSuccess ? 'success' : 'red base'"
        min-width="auto"
        width="100vw"
        max-width="400px"
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar.isShow = false"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
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
      formulirData: null,
      snackbar: {
        isSuccess: false,
        isShow: false,
        message: ''
      }
    }
  },
  methods: {
    handleFormulirPenerimaSubmit(value) {
      this.isFormulirMode = false;
      this.formulirData   = value;
      window.scrollTo(0,0);
    },
    handlePreviewPenerimaBack() {
      this.isFormulirMode = true;
      this.formulirData   = null;
      window.scrollTo(0,0);
    },
    handleFormulirPenerimaNotification(value) {
      this.snackbar.message   = value.message;
      this.snackbar.isSuccess = value.success;
      this.snackbar.isShow    = true;
    }
  }
};
</script>
