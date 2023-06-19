import { createApp, onMounted, ref } from "./vue-3-3-4.js";
import Loading from "./components/loading.js"

const cards = ref([]);
const search = ref("");
const isLoading = ref(false);
const zoom = '15rem';
const cardSelected = ref();
const apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

function handleErrorImage() {
  document.getElementsByClassName(card.id)[0].src = "assets/card-error.png";
  document.getElementsByClassName(card.id)[0].onerror = "";

  return true;
}

function onLoadImage(card) {
  document.getElementsByClassName(card.id)[0].src = card.card_images[0].image_url;
}

function openCard(card){
  cardSelected.value = card;
}

function onZoom(_cardSelected){
  cards.value = cards.value.map(card => {
    if(card.id === _cardSelected.id){
      card.zoom = true;
    }else{
      card.zoom = false;
    }

    return card;
  });
}

function onCards(){
  if(search.value.trim()){
    isLoading.value = true;

    axios.get(apiUrl.concat("?fname=").concat(search.value))
      .then((response) => {
        cards.value = response.data.data;
      })
      .catch((error) => {
        cards.value = [];
        console.log(error);
      })
      .finally(() => {
        isLoading.value = false;
      })
  }else{
    cards.value = [];
  }
}

const app = createApp({
  setup() {
    return {
      cards,
      search,
      isLoading,
      zoom,
      cardSelected,
      apiUrl,

      handleErrorImage,
      onLoadImage,
      openCard,
      onZoom,
      onCards,

      onMounted,

      Loading
    }
  },

}).mount('#app');
