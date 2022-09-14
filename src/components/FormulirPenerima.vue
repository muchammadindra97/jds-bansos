<template>
  <v-container>
    <v-card max-width="750px" elevation="2" class="mx-auto">
      <v-card-title>Formulir Penerima</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.name"
              type="text"
              label="Nama"
              required
              :rules="[(v) => !!v || 'Isian nama tidak boleh kosong!']"
          ></v-text-field>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.nik"
              type="number"
              min=0
              label="NIK"
              required
              :rules="[
                (v) => !!v || 'Isian NIK tidak boleh kosong!',
                (v) => (v >= 0) || 'Periksa kembali isian NIK!'
              ]"
          ></v-text-field>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.noKartuKeluarga"
              type="number"
              min=0
              label="Nomor Kartu Keluarga"
              required
              :rules="[
                (v) => !!v || 'Isian nomor kartu keluarga tidak boleh kosong!',
                (v) => (v >= 0) || 'Periksa kembali isian nomor kartu keluarga!'
              ]"
          ></v-text-field>

          <v-file-input
              class="mb-2"
              outlined
              v-model="formData.fotoKTP"
              label="Foto KTP"
              truncate-length="22"
              :show-size="1024"
              required
              accept="image/png, image/jpeg, image/jpg, image/bmp"
              :error-messages="fileTypeError.fotoKTP"
              :rules="[(v) => !!v || 'Isian foto KTP tidak boleh kosong!']"
          ></v-file-input>

          <v-img
              class="mb-2"
              v-if="srcPreviewKTP !== null"
              contain
              width="100%"
              max-height="150px"
              :src="srcPreviewKTP"
          ></v-img>

          <v-file-input
              class="mb-2"
              outlined
              v-model="formData.fotoKartuKeluarga"
              label="Foto Kartu Keluarga"
              truncate-length="22"
              :show-size="1024"
              required
              accept="image/png, image/jpeg, image/jpg, image/bmp"
              :error-messages="fileTypeError.fotoKartuKeluarga"
              :rules="[(v) => !!v || 'Isian foto KK tidak boleh kosong!']"
          ></v-file-input>

          <v-img
              class="mb-2"
              v-if="srcPreviewKK !== null"
              contain
              width="100%"
              max-height="150px"
              :src="srcPreviewKK"
          ></v-img>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.umur"
              type="number"
              min=25
              label="Umur"
              required
              :rules="[
                (v) => !!v || 'Isian umur tidak boleh kosong!',
                (v) => (v >= 25) || 'Umur minimal 25 tahun!'
              ]"
          ></v-text-field>

          <v-radio-group
              class="mb-5 mt-2"
              v-model="formData.jenisKelamin"
              label="Jenis Kelamin"
              :rules="[(v) => !!v || 'Pilih salah satu jenis kelamin!']"
          >
            <template v-for="item in JENIS_KELAMIN">
              <v-radio
                  :key="item.value"
                  :label="item.text"
                  :value="item"
              ></v-radio>
            </template>
          </v-radio-group>

          <v-combobox
              class="mb-2"
              outlined
              v-model="formData.provinsi"
              :items="provinsiList.data"
              item-value="id"
              item-text="name"
              label="Provinsi"
              required
              clearable
              :loading="provinsiList.isLoading"
              :rules="[(v) => !!v || 'Isian provinsi tidak boleh kosong!']"
          ></v-combobox>

          <v-combobox
              class="mb-2"
              outlined
              v-model="formData.kabKota"
              :items="kabKotaList.data"
              label="Kab/Kota"
              item-value="id"
              item-text="name"
              required
              clearable
              :loading="kabKotaList.isLoading"
              :rules="[
                (v) => !!v || 'Isian kabupaten / kota tidak boleh kosong!'
              ]"
          ></v-combobox>

          <v-combobox
              class="mb-2"
              outlined
              v-model="formData.kecamatan"
              :items="kecamatanList.data"
              label="Kecamatan"
              item-value="id"
              item-text="name"
              required
              clearable
              :loading="kecamatanList.isLoading"
              :rules="[(v) => !!v || 'Isian kecamatan tidak boleh kosong!']"
          ></v-combobox>

          <v-combobox
              class="mb-2"
              outlined
              v-model="formData.kelurahanDesa"
              :items="kelurahanDesaList.data"
              label="Kelurahan/Desa"
              item-value="id"
              item-text="name"
              required
              clearable
              :loading="kelurahanDesaList.isLoading"
              :rules="[
                (v) => !!v || 'Isian kelurahan / desa tidak boleh kosong!'
              ]"
          ></v-combobox>

          <v-textarea
              clearable
              class="mb-2"
              outlined
              v-model="formData.alamat"
              label="Alamat"
              required
              :rules="[
                (v) => !!v || 'Isian alamat tidak boleh kosong!',
                (v) => (v && v.length <= 255) || 'Alamat terlalu panjang (lebih dari 255 karakter).'
              ]"
          ></v-textarea>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.rt"
              label="RT"
              required
              :rules="[(v) => !!v || 'Isian RT tidak boleh kosong!']"
          ></v-text-field>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.rw"
              label="RW"
              required
              :rules="[(v) => !!v || 'Isian RW tidak boleh kosong!']"
          ></v-text-field>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.penghasilanSebelum"
              type="number"
              min=0
              label="Penghasilan sebelum pandemi"
              :hint="numberToRupiah(formData.penghasilanSebelum)"
              persistent-hint
              required
              :rules="[
                (v) => !!v || 'Isian penghasilan sebelum pandemi tidak boleh kosong!',
                (v) => (v >= 0) || 'Periksa kembali isian penghasilan sebelum pandemi!'
              ]"
          ></v-text-field>

          <v-text-field
              clearable
              class="mb-2"
              outlined
              v-model="formData.penghasilanSesudah"
              type="number"
              min=0
              label="Penghasilan setelah pandemi"
              :hint="numberToRupiah(formData.penghasilanSesudah)"
              persistent-hint
              required
              :rules="[
                (v) => !!v || 'Isian penghasilan setelah pandemi tidak boleh kosong!',
                (v) => (v >= 0) || 'Periksa kembali isian penghasilan setelah pandemi!'
              ]"
          ></v-text-field>

          <v-select
              class="mb-2"
              outlined
              v-model="formData.alasan"
              :items="ALASAN_BANTUAN"
              label="Alasan membutuhkan bantuan"
              required
              clearable
              return-object
              @input="formData.alasanLainnya = null"
              :rules="[
                (v) => !!v || 'Isian alasan membutuhkan bantuan tidak boleh kosong!'
              ]"
          ></v-select>

          <v-textarea
              clearable
              class="mb-2"
              outlined
              v-model="formData.alasanLainnya"
              v-if="formData.alasan && formData.alasan.value === 'LAINNYA'"
              label="Deskripsi alasan lainnya"
              :rules="[
                (v) => (formData.alasan && formData.alasan.value === 'LAINNYA' && !!v) || 'Isian deskripsi alasan lainnya tidak boleh kosong!'
              ]"
          ></v-textarea>

          <v-checkbox
              class="mt-1 mb-5"
              v-model="formData.persetujuan"
              require
              :rules="[(v) => !!v || 'Silahkan baca dan centang pernyataan diatas!']"
          >
            <template v-slot:label>
              <div style="font-size: 0.9rem">
                Saya menyatakan bahwa data yang diisikan adalah benar dan
                siap mempertanggungjawabkan apabila ditemukan
                ketidaksesuaian dalam data tersebut.
              </div>
            </template>
          </v-checkbox>

          <v-btn
              :disabled="!isFormValid"
              :loading="isSubmitting"
              color="success"
              class="mr-4"
              @click="submit"
          >
            Kirim
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  EMSIFA_WILAYAH_API,
  JENIS_KELAMIN,
  ALASAN_BANTUAN,
} from "@/utils/constant";
import {generateImagePreviewSrc, fetchBackend, numberToRupiah} from "@/utils/helper";

export default {
  name: "FormulirPenerima",
  data() {
    return {
      JENIS_KELAMIN,
      ALASAN_BANTUAN,
      isFormValid: true,
      formData: {
        name: null,
        nik: null,
        noKartuKeluarga: null,
        fotoKTP: null,
        fotoKartuKeluarga: null,
        umur: null,
        jenisKelamin: null,
        provinsi: null,
        kabKota: null,
        kecamatan: null,
        kelurahanDesa: null,
        alamat: null,
        rt: null,
        rw: null,
        penghasilanSebelum: null,
        penghasilanSesudah: null,
        alasan: null,
        alasanLainnya: null,
        persetujuan: null,
      },
      provinsiList: {
        isLoading: false,
        data: [],
      },
      kabKotaList: {
        isLoading: false,
        data: [],
      },
      kecamatanList: {
        isLoading: false,
        data: [],
      },
      kelurahanDesaList: {
        isLoading: false,
        data: [],
      },
      fileTypeError: {
        fotoKTP: null,
        fotoKartuKeluarga: null,
      },
      isSubmitting: false
    };
  },
  methods: {
    numberToRupiah,
    async getProvinsi() {
      try {
        this.provinsiList.isLoading = true;

        const result = await fetch(`${EMSIFA_WILAYAH_API}/provinces.json`);

        this.provinsiList.data = await result.json();
      } catch (e) {
        this.provinsiList.data = [];
      } finally {
        this.provinsiList.isLoading = false;
      }
    },
    async getKabKota() {
      try {
        this.kabKotaList.isLoading = true;

        if (this.formData.provinsi.id) {
          const result = await fetch(
              `${EMSIFA_WILAYAH_API}/regencies/${this.formData.provinsi.id}.json`
          );

          this.kabKotaList.data = await result.json();
        }
      } catch (e) {
        this.kabKotaList.data = [];
      } finally {
        this.kabKotaList.isLoading = false;
      }
    },
    async getKecamatan() {
      try {
        this.kecamatanList.isLoading = true;

        if (this.formData.kabKota.id) {
          const result = await fetch(
              `${EMSIFA_WILAYAH_API}/districts/${this.formData.kabKota.id}.json`
          );

          this.kecamatanList.data = await result.json();
        }
      } catch (e) {
        this.kecamatanList.data = [];
      } finally {
        this.kecamatanList.isLoading = false;
      }
    },
    async getKelurahanDesa() {
      try {
        this.kelurahanDesaList.isLoading = true;

        if (this.formData.kecamatan.id) {
          const result = await fetch(
              `${EMSIFA_WILAYAH_API}/villages/${this.formData.kecamatan.id}.json`
          );

          this.kelurahanDesaList.data = await result.json();
        }
      } catch (e) {
        this.kelurahanDesaList.data = [];
      } finally {
        this.kelurahanDesaList.isLoading = false;
      }
    },
    validateFile(file) {
      if (file !== null && !file.type.includes("image")) {
        return "File yang dipilih bukan gambar!";
      } else if (file !== null && file.size > 2 * 1024 * 1024) {
        return "Ukuran file maksimal 2 MiB!";
      }

      return null;
    },
    async submit() {
      try {
        this.isSubmitting = true;
        const isFormValid = this.$refs.form.validate();

        if (isFormValid) {
          const result = await fetchBackend(this.formData);

          this.$emit('submit', result.data);
          this.$emit('notification', {
            success: true,
            message: 'Data penerima berhasil dikirim!'
          });
        } else {
          this.$emit('notification', {
            success: false,
            message: 'Periksa kembali isian form Anda!'
          });
        }
      } catch (e) {
        this.$emit('notification', {
          success: false,
          message: 'Terjadi kesalahan server, cobalah beberapa saat lagi!'
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  computed: {
    srcPreviewKTP() {
      return generateImagePreviewSrc(this.formData.fotoKTP);
    },
    srcPreviewKK() {
      return generateImagePreviewSrc(this.formData.fotoKartuKeluarga);
    },
  },
  mounted() {
    this.getProvinsi();
  },
  watch: {
    "formData.provinsi": function (value) {
      if (value.id) {
        this.getKabKota();
      } else {
        this.kabKotaList.data = [];
      }
    },
    "formData.kabKota": function (value) {
      if (value.id) {
        this.getKecamatan();
      } else {
        this.kecamatanList.data = [];
      }
    },
    "formData.kecamatan": function (value) {
      if (value.id) {
        this.getKelurahanDesa();
      } else {
        this.kelurahanDesaList.data = [];
      }
    },
    "formData.fotoKTP": function (value) {
      this.fileTypeError.fotoKTP = this.validateFile(value);
    },
    "formData.fotoKartuKeluarga": function (value) {
      this.fileTypeError.fotoKartuKeluarga = this.validateFile(value);
    },
  },
};
</script>
