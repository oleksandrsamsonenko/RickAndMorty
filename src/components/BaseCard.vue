<template>
  <div class="card">
    <h3 class="title">{{ name }}</h3>
    <div class="info">
      <img :src="image" :alt="name" class="image" />
      <div>
        <p class="text">
          <i>Status: </i>
          <span
            class="status"
            :class="{
              alive: status === 'Alive',
              dead: status === 'Dead',
              unknown: status === 'unknown'
            }"
          >
          </span>
          {{ status }}
        </p>

        <p class="text"><i>Race: </i> {{ species }}</p>
        <p class="text"><i>Gender: </i> {{ gender }}</p>
        <p class="text" v-if="type"><i>Type: </i> {{ type }}</p>
        <p class="text"><i>Origin planet: </i>{{ origin }}</p>
        <p class="text"><i>Last known location: </i>{{ location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'unknown'
    },
    species: {
      type: String,
      required: true,
      default: 'unknown'
    },
    location: {
      type: String,
      required: true,
      default: 'unknown'
    },
    gender: {
      type: String,
      required: false,
      default: 'unknown'
    },
    type: {
      type: String,
      required: false,
      default: null
    },
    origin: {
      type: String,
      required: false,
      default: 'unknown'
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgb(60, 62, 68);
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.title {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 5px 0;
  background-color: rgb(32, 35, 41);
  color: whitesmoke;
  font-weight: bold;
  font-size: 130%;
}

.info {
  display: grid;
  gap: 10px;
  grid-template-columns: 35% 1fr;
}

.text {
  color: whitesmoke;
  font-size: 125%;
}

i {
  opacity: 0.65;
}
.image {
  width: 100%;
}

.descr {
  display: flex;
  align-items: center;
  gap: 15px;
  text-transform: capitalize;
}

.status::before,
.status::before,
.status::before {
  display: inline-block;
  content: '';
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.alive::before {
  background-color: rgb(12, 182, 12);
}

.dead::before {
  background-color: rgb(191, 4, 4);
}

.unknown::before {
  background-color: rgba(117, 123, 117);
}
</style>
