<template>
  <div class="container">
    <div class="box comic-viewer-box mb-0">
      <div class="loader-wrapper" v-bind:class="{ 'is-active': isLoading }">
        <div class="loader is-loading"></div>
      </div>
      <div class="mb-3">
        <h1 class="title">{{ getComicInfo.title }}</h1>
        <h2 class="subtitle">{{ "#" + getComicInfo.num }}</h2>
      </div>
      <div class="mb-3">
        <img
          class="comic-image"
          :src="getComicInfo.img"
          :alt="getComicInfo.alt"
          v-on:load="updateImageLoading()"
          @click="activeModal = true;"
        />
      </div>
      <div class="level mb-2">
        <div class="level-item">
          <button
            class="button is-success"
            @click="changeComic(-1)"
            :disabled="enableButton.previous"
          >
            <span class="icon">
              <i class="fas fa-arrow-circle-left"></i>
            </span>
          </button>
          <button class="button is-primary mx-1" @click="getRandomComic()">
            <span class="icon">
              <i class="fas fa-random"></i>
            </span>
          </button>
          <button
            class="button is-success"
            @click="changeComic(1)"
            :disabled="enableButton.next"
          >
            <span class="icon">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <rating
            :items="items"
            :value="rateValue"
            kind="grow"
            @change="updateRating"
          >
          </rating>
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': activeModal }" @click="activeModal = false;">
      <div class="modal-background"></div>
      <div class="modal-content">
        <img :src="getComicInfo.img" :alt="getComicInfo.alt" />
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Rating from "vue-bulma-rating";

export default {
  name: "ComicViewer",
  components: {
    Rating,
  },
  data() {
    return {
      rateValue: -1,
      items: [
        {
          title: "5 Stars",
          value: 5,
        },
        {
          title: "4 Stars",
          value: 4,
        },
        {
          title: "3 Stars",
          value: 3,
        },
        {
          title: "2 Stars",
          value: 2,
        },
        {
          title: "1 Star",
          value: 1,
        },
      ],
      imageLoading: false,
      maxNumber: 2367,
      ratings: [],
      activeModal: false
    };
  },
  computed: {
    ...mapGetters(["getComicInfo", "getIsLoading"]),
    isLoading() {
      return this.getIsLoading | this.imageLoading;
    },
    enableButton() {
      if (this.getComicInfo.num == 1) {
        return {
          previous: true,
          next: false,
        };
      } else if (this.getComicInfo.num >= this.maxNumber) {
        return {
          previous: false,
          next: true,
        };
      } else {
        return {
          previous: false,
          next: false,
        };
      }
    },
  },
  methods: {
    ...mapActions(["updateComicInfo"]),
    updateImageLoading() {
      this.imageLoading = false;
      if (this.ratings.length > 0) {
        const ratingIndex = this.ratings.findIndex(
          (rate) => rate.num == this.getComicInfo.num
        );
        if (ratingIndex == -1) {
          this.$children[0].change({ target: { value: -1 } });
        } else {
          this.$children[0].change({
            target: { value: this.ratings[ratingIndex].val },
          });
        }
      }
    },
    updateRating(val) {
      this.rateValue = val;
      const ratingIndex = this.ratings.findIndex(
        (rate) => rate.num == this.getComicInfo.num
      );
      if (ratingIndex == -1) {
        this.ratings.push({
          num: this.getComicInfo.num,
          val: this.rateValue,
        });
      } else {
        this.ratings[ratingIndex] = {
          num: this.getComicInfo.num,
          val: this.rateValue,
        };
      }
    },
    getRandomComic() {
      const newNum = Math.floor(Math.random() * this.maxNumber + 1);
      this.imageLoading = true;
      this.updateComicInfo(newNum);
    },
    changeComic(num) {
      this.imageLoading = true;
      this.updateComicInfo(this.getComicInfo.num + num);
    },
  },
  mounted() {
    this.getRandomComic();
  },
};
</script>