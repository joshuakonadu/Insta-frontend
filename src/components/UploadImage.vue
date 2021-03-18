<template>
  <b-modal
    @shown="resetState()"
    id="imageUpload"
    ref="imageUpload"
    centered
    title="Image Uploader"
    :hide-footer="true"
  >
    <div
      @drag-enter="handledragenter"
      @dragover="handledragover"
      @drop="loadFile"
      @dragleave="handledragleave"
      class="hero-drop"
    >
      <div
        class="card align-items-center dropcard"
        :class="{ dropover: dropover }"
      >
        <div class="uploadcard-header">
          <b>Bilder Hochladen</b>
        </div>

        <form
          @click="$refs.file.click()"
          action="/upload"
          method="post"
          class="dropzone needsclick dz-clickable"
          id="drop-zone"
        >
          <template>
            <div class="upload-message">
              Klicke um den Upload zu starten.
              <span class="icon mt-2" style="font-size:3rem">
                <font-awesome-icon :icon="['far', 'upload']" />
              </span>
            </div>

            <div class="dz-newana"></div>
            <div
              v-for="(file, index) in filequeue"
              :key="index"
              class="fileindicator"
              v-bind:class="{ success: uploadPercentage == 100 }"
            >
              <div class="infos">
                <div class="file-icon icon green">
                  <font-awesome-icon :icon="['far', 'check-circle']" />
                </div>
                <div class="file-size">
                  <span data-dz-size
                    ><strong>{{ filesize(file.size) }}</strong
                    >{{ filesizeunit(file.size) }}</span
                  >
                </div>
                <div class="file-name">
                  <span data-dz-name>{{
                    file.name | truncate(10, "...")
                  }}</span>
                </div>
                <div @click.stop="delfile(index)" class="file-remove icon">
                  <font-awesome-icon :icon="['far', 'trash-alt']" />
                </div>
              </div>
              <div class="fileloadindicator">
                <span
                  class="file-uploadbar"
                  v-bind:class="{ success: uploadPercentage == 100 }"
                  :style="{ width: uploadPercentage + '%' }"
                ></span>
              </div>
            </div>

            <input
              type="file"
              ref="file"
              name="files[]"
              multiple
              style="display: none;"
              @change.stop.prevent="loadFile"
            />
          </template>
        </form>
        <div class="upload-footer">
          <button
            @click.stop="uploadImages()"
            class="btn"
            v-bind:class="[
              filequeue.length == 0 ? ' btn-secondary disabled' : 'btn-primary'
            ]"
          >
            Bilder Hochladen
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "UploadImage",
  data() {
    return {
      filequeue: [],
      uploadPercentage: 0,
      loading: false,
      success: false,
      errors: [],
      dropover: false,
      collapsed: true,
      onlyunread: true
    };
  },
  methods: {
    handledragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    handledragover(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dropover = true;
    },
    handledragleave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dropover = false;
    },
    toCandidate() {
      this.$bvModal.hide("imageUpload");
    },
    readfile(file) {
      var name = file.name;
      var that = this;
      var reader = new FileReader();
      reader.onload = function(e) {
        that.filequeue.push({
          name: file.name,
          image: reader.result.split(",")[1],
          size: file.size,
          format: file.type.split("/")[1]
        });
      };
      reader.readAsDataURL(file);
    },
    loadFile(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.errors = [];
      var files = ev.target.files;
      if (typeof event.dataTransfer !== "undefined") {
        var dt = event.dataTransfer;
        var files = dt.files;
        this.dropover = false;
      } else {
        var files = event.target.files;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (/\.(jpe?g|png|pdf|jpg|)$/i.test(file.name)) {
          this.readfile(file);
          var reader = new FileReader();
        } else {
          this.errors.push(
            "Die Datei " +
              file.name +
              " konnte nicht hochgeladen werden. Der Dateityp wird nicht unterstützt"
          );
        }
      }
    },
    delfile(fileid) {
      this.filequeue.splice(this.filequeue.indexOf(fileid), 1);
    },
    filesize(size) {
      if (size < 1000000) {
        return (size / 1000).toFixed(2);
      } else {
        return (size / 1000000).toFixed(2);
      }
    },
    filesizeunit(size) {
      if (size < 1000000) {
        return "KB";
      } else {
        return "MB";
      }
    },
    uploadImages() {
      this.$store
        .dispatch("user/uploadImages", { uploadList: this.filequeue })
        .then(() => {
          this.filequeue = [];
          this.toCandidate();
        })
        .catch(error => {
          this.filequeue = [];
          this.toCandidate();
        });
    },
    resetState() {
      this.loading = false;
      this.filequeue = [];
      this.success = false;
      this.uploadPercentage = 0;
    }
  }
};
</script>

<style scoped>
#dropdownnewprofile .btn.btn-link {
  padding: 0;
  color: rgb(154, 160, 172);
}
/* #dropdownanalytics .btn.btn-link {
  padding: 0;
  color: rgb(154, 160, 172);
} */
.fileindicator {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(210, 210, 210);
  border-radius: 4px;
  margin: 5px 0;
}
.fileindicator .infos {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  color: #444;
}
.file-remove {
  color: rgb(149, 19, 19);
  cursor: pointer;
}
.fileloadindicator {
  background-color: rgb(115, 115, 115);
  height: 8px;
  display: flex;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.fileindicator.success {
  background-color: rgb(237, 250, 241);
  border: 1px solid rgb(38, 183, 93);
}
.file-uploadbar {
  background-color: rgb(43, 137, 192);
}
.file-uploadbar.success {
  background-color: rgb(99, 203, 137);
}
.upload-message {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.dropzone {
  cursor: pointer;
  min-height: 100px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
