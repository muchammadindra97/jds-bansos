<template>
  <v-container>
    <v-card max-width="750px" elevation="2" class="mx-auto">
      <v-card-title>Data Penerima Terkirim</v-card-title>
      <v-card-text>
        <DataItem label="Nama" :value="data.name" />
        <DataItem label="NIK" :value="data.nik" />
        <DataItem label="Nomor Kartu Keluarga" :value="data.noKartuKeluarga" />
        <DataItem label="Foto KTP" :value="data.fotoKTP.name">
          <v-img
              class="mb-2"
              v-if="data.fotoKTP !== null"
              contain
              width="100%"
              max-height="150px"
              :src="generateImagePreviewSrc(data.fotoKTP)"
          ></v-img>
        </DataItem>
        <DataItem label="Foto Kartu Keluarga" :value="data.fotoKartuKeluarga.name">
          <v-img
              class="mb-2"
              v-if="data.fotoKartuKeluarga !== null"
              contain
              width="100%"
              max-height="150px"
              :src="generateImagePreviewSrc(data.fotoKartuKeluarga)"
          ></v-img>
        </DataItem>
        <DataItem label="Umur" :value="data.umur" />
        <DataItem label="Jenis Kelamin" :value="data.jenisKelamin.text" />
        <DataItem label="Provinsi" :value="data.provinsi.name ?? data.provinsi" />
        <DataItem label="Kab/Kota" :value="data.kabKota.name ?? data.kabKota" />
        <DataItem label="Kecamatan" :value="data.kecamatan.name ?? data.kecamatan" />
        <DataItem label="Kelurahan/Desa" :value="data.kelurahanDesa.name ?? data.kelurahanDesa" />
        <DataItem label="Alamat" :value="data.alamat" />
        <DataItem label="RT" :value="data.rt" />
        <DataItem label="RW" :value="data.rw" />
        <DataItem label="Penghasilan sebelum pandemi" :value="data.penghasilanSebelum" />
        <DataItem label="Penghasilan setelah pandemi" :value="data.penghasilanSesudah" />
        <DataItem label="Alasan membutuhkan bantuan" :value="data.alasan.text" />
        <DataItem v-if="data.alasan.value === 'LAINNYA'" label="Deskripsi alasan lainnya" :value="data.alasanLainnya" />

        <v-btn
            color="success"
            class="mr-4 mt-5"
            @click="$emit('back')"
        >
          Buat Data Baru
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DataItem from "@/components/DataItem";
import {generateImagePreviewSrc} from "@/utils/helper";

export default {
  name: "PreviewPenerima",
  components: {DataItem},
  props: {
    data: Object
  },
  methods: {
    generateImagePreviewSrc
  }
}
</script>
