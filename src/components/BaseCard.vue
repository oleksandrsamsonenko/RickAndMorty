<template>
  <div class="card">
    <div class="title">
      <h3>{{ name }}</h3>
      <router-link :to="{ name: 'character', params: { id } }" class="link">
        To the character page
      </router-link>
    </div>

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
        <!-- <p class="text"><i>Last known location: </i>{{ location }}</p> -->
      </div>
      <div v-if="this.$store.getters['user/getCurrentUser']" class="favorite">
        <button v-if="loading" disabled>Wait...</button>
        <div v-else>
          <button v-if="!isFavorite" type="button" @click="addToFavorite" class="add">Add</button>
          <button v-else type="button" @click="removeFromFavorite(isFavorite.$id)" class="remove">
            Remove
          </button>
        </div>
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
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    isFavorite() {
      return this.$store.getters.getStatus(this.id)
    }
  },

  methods: {
    async addToFavorite() {
      this.loading = true
      await this.$store.dispatch(`addToFavorite`, {
        id: this.id,
        name: this.name,
        race: this.race,
        gender: this.gender
      })
      this.loading = false
    },
    async removeFromFavorite(id) {
      this.loading = true
      await this.$store.dispatch(`removeFromFavorite`, {
        id
      })
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
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

.favorite {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0;

  button {
    background-color: transparent;
    padding: 8px 16px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    font-size: 16px;
  }
}

.add {
  color: green;
  border-color: green;
}
.remove {
  color: red;
  border-color: red;
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
  display: grid;
  padding: 10px 15px;
  grid-template-columns: 1fr auto;
  align-items: baseline;
}

.link {
  color: rgba(245, 245, 245, 0.7);
  cursor: pointer;
  text-decoration: none;
  border: 1px solid rgba(245, 245, 245, 0.7);
  border-radius: 10px;
  padding: 3px 5px;
  font-size: 85%;
  transition: all 0.4s;
}
.link:hover {
  color: goldenrod;
  border-color: goldenrod;
}
.info {
  display: grid;
  gap: 10px;
  grid-template-columns: 35% 1fr;
  position: relative;
}

.text {
  color: whitesmoke;
  font-size: 125%;
}

i {
  color: grey;
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
