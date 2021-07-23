<template>
  <div class="main">
    <video @click="changeState" ref="video" :src="`${$root.apiUrl}/file?path=${file}`"></video>
    <div @click="clickOnBar" ref="bar" class="bar">
      <div class="current">{{ current }}</div>
      <div class="duration">{{ duration }}</div>
      <div class="fill" :style="{ width: progress * 100 + '%' }"></div>
    </div>
    <div v-if="$refs['video']" class="control">
      <button @click="offset(-$refs['video'].playbackRate)">&lt;</button>
      <button @click="offset($refs['video'].playbackRate)">&gt;</button>
      <button @click="changeSpeed(-0.1)">Slow</button>
      <div>{{ $refs['video'].playbackRate.toFixed(1) }}</div>
      <button @click="changeSpeed(0.1)">Fast</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../util/RestApi';
import Moment from 'moment';

export default defineComponent({
  components: {},
  async mounted() {
    // Get file info
    const info = await RestApi.file.getInfo();
    this.file = info.file;

    setInterval(() => {
      const video = this.$refs['video'] as HTMLVideoElement;
      if (!video) return 0;

      this.progress = video.currentTime / video.duration;

      this.current = Moment.utc(
        Moment.duration(video.currentTime, 'seconds').asMilliseconds(),
      ).format('HH:mm:ss.S');

      this.duration = Moment.utc(
        Moment.duration(video.duration, 'seconds').asMilliseconds(),
      ).format('HH:mm:ss');
    }, 16);

    document.addEventListener('keydown', this.keyEvents);
  },
  methods: {
    clickOnBar(e: any) {
      const video = this.$refs['video'] as HTMLVideoElement;
      const bar = this.$refs['bar'] as HTMLElement;

      const offset = (e.pageX - bar.getBoundingClientRect().x) / bar.getBoundingClientRect().width;
      video.currentTime = offset * video.duration;
    },
    changeState() {
      const video = this.$refs['video'] as HTMLVideoElement;

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }

      this.isPlay = !video.paused;
    },
    keyEvents(e: any) {
      const video = this.$refs['video'] as HTMLVideoElement;
      if (!video) {
        return;
      }

      if (e.key === 'ArrowRight') {
        video.currentTime += video.playbackRate;
      }
      if (e.key === 'ArrowLeft') {
        video.currentTime -= video.playbackRate;
      }
      if (e.key === ' ') {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    },
    offset(p: number) {
      const video = this.$refs['video'] as HTMLVideoElement;
      video.currentTime += p;
    },
    changeSpeed(speed: number) {
      const video = this.$refs['video'] as HTMLVideoElement;
      video.playbackRate += speed;
    },
  },
  data: () => {
    return {
      file: '',
      files: [],

      progress: 0,
      current: '',
      duration: '',
      isPlay: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;

  video {
    // margin: auto auto;
    //width: 100%;
    height: calc(100% - 40px);
  }

  .control {
    display: flex;
    align-items: center;
  }

  .bar {
    display: flex;
    position: relative;
    bottom: 0px;
    width: 100%;
    font-size: 12px;
    height: 16px;
    box-sizing: border-box;
    color: #d4d4d4;
    // border-top: 1px solid #19191985;

    .fill {
      width: 50%;
      background: #b4b4b45e;
    }

    .duration,
    .current {
      position: absolute;
    }

    .current {
      left: 10px;
      top: 2px;
    }

    .duration {
      right: 10px;
      top: 2px;
    }
  }
}
</style>
