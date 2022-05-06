import { createApp } from 'vue';
import axios from 'axios';

import './assets/styles/bulma.main.css';
import './assets/styles/main.css';
import { isEmpty } from 'lodash';

const app = createApp({
  data: () => ({
    cards: [],
    search: 'raid',
    isLoading: false,
    cardSelected: null,
    urlYgoProdeck: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
    deck: [],
    isOpenCard: false,
  }),
  mounted() {
    this.onCards();
  },
  methods: {
    handleErrorImage(card: Card) {
      const docCard = document
        .getElementsByClassName(card.id.toString()) as any;
      if (docCard.length) {
        docCard[0].src = 'assets/images/card-error.webp';
      }
      return true;
    },
    onLoadImage(card: Card) {
      const docCard = document
        .getElementsByClassName(card.id.toString()) as any;
      if (docCard.length) {
        docCard[0].src = card.card_images[0].image_url;
      }
    },
    selectCard(card: Card) {
      if (this.card !== card) {
        this.cardSelected = card;
      }
    },
    openCard(isOpen: boolean) {
      this.isOpenCard = isOpen;
    },
    addToDeck(card: Card): void {
      this.deck.push(card);
      console.log(card);
    },
    onCards() {
      if (!isEmpty(this.search)) {
        this.isLoading = true;
        axios.get(this.urlYgoProdeck.concat('?fname=').concat(this.search))
          .then(({ data: { data } }) => {
            this.cards = data;
          })
          .catch((error) => {
            this.cards = [];
            console.error(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.cards = [];
      }
    },
  },
});

app.mount('#app');
