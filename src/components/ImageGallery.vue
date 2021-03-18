<template>
  <div class="containerSelf">
    <div v-if="images.length > 0" class="row">
      <div
        v-for="(image, index) in images"
        :key="image._id"
        class="col-sm-6 col-lg-4"
      >
        <div class="card card-sm">
          <button
            @click.stop="deleteImage(image._id, index, image.imageUri)"
            class="abs btn btn-sm btn-secondary"
          >
            <font-awesome-icon class="fontSize" :icon="['far', 'eraser']" />
          </button>
          <div
            @click="goToRoute({ name: 'userImage', params: { id: image._id } })"
            class="d-block curS"
          >
            <img
              :src="`${imageBaseUrl}/${userId}/${image.imageUri}`"
              class="card-img-top max-height"
            />
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="lh-sm">
                <div>Sunny Airey</div>
                <div class="text-muted">
                  Vor {{ image.createdAt | elapsed }}
                </div>
              </div>
              <div class="ml-auto">
                <!-- <a href="#" class="text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="12" r="2"></circle><path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2"></path><path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2"></path></svg>
                        301
                      </a> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"
                  ></path>
                </svg>
                {{ image.likes.length }}
              </div>
              <span
                v-if="!image.private"
                title="Privat"
                @click="setImagePrivacy(image._id)"
                class="ml-4 curS"
                ><font-awesome-icon :icon="['far', 'eye-slash']"
              /></span>
              <span
                v-else
                title="Öffentlich"
                @click="setImagePrivacy(image._id)"
                class="ml-4 curS"
                ><font-awesome-icon :icon="['far', 'eye']"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="verifyDelete"
      ref="verifyDelete"
      centered
      title="Bild Löschen?"
      @cancel="resetState"
      @ok="deleteVerify"
      ok-title="Löschen"
      cancel-title="Abbrechen"
    >
      Wollen Sie das Bild wirklich löschen?
    </b-modal>
  </div>
</template>

<script>
import { BackendConfig } from "@/backend.config";
export default {
  name: "ImageGallery",
  data() {
    return {
      deleteId: "",
      deleteIndex: "",
      deleteUri: "",
      imageBaseUrl: BackendConfig.baseURL + BackendConfig.images
    };
  },
  methods: {
    goToRoute(params) {
      this.$router.push(params);
    },
    deleteImage(id, index, uri) {
      this.deleteId = id;
      this.deleteIndex = index;
      this.deleteUri = uri;
      this.$refs.verifyDelete.show();
    },
    deleteVerify() {
      this.$store
        .dispatch("user/deleteImage", {
          index: this.deleteIndex,
          id: this.deleteId,
          fileName: this.deleteUri
        })
        .then(() => {
          this.resetState();
        });
    },
    resetState() {
      this.deleteId = "";
      this.deleteIndex = "";
      this.deleteUri = "";
    },
    setImagePrivacy(id) {}
  },
  computed: {
    images() {
      return this.$store.state.user.images;
    },
    userId() {
      return this.$store.state.user.userId;
    }
  }
};
</script>

<style scoped>
.max-height {
  height: 380px;
}
.curS:hover {
  cursor: pointer;
}

.abs {
  position: absolute;
  right: 0;
}

.card .abs {
  opacity: 0;
}

.card:hover .abs {
  opacity: 1;
}
.fontSize {
  font-size: 1rem;
}
</style>
