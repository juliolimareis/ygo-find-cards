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
    nameDeckSelected: "empty",
    decks: {
      empty: {
        main: [],
        extra: [],
        side: [],
      },
    },
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
    getDecks(): void {
      const decks = localStorage.getItem("decks");
      if (!isEmpty(decks)) {
        this.decks = JSON.parse(decks);
      }
    },
    saveDecks(): void {
      localStorage.setItem("decks", JSON.stringify(this.decks));
    },
    getDeckSelected() {
      return this.decks[this.nameDeckSelected];
    },
    orderDeck(typeDeck: string): void {
      const deck = this.getDeckSelected();
      const monster = deck[typeDeck].filter((c: Card) => c.type.toLocaleLowerCase().includes("monster")).sort((a: Card, b: Card) => a.id - b.id);
      const magic = deck[typeDeck].filter((c: Card) => c.type.toLocaleLowerCase().includes("spell")).sort((a: Card, b: Card) => a.id - b.id);
      const trap = deck[typeDeck].filter((c: Card) => c.type.toLocaleLowerCase().includes("trap")).sort((a: Card, b: Card) => a.id - b.id);
      this.decks[this.nameDeckSelected][typeDeck] = [...monster, ...magic, ...trap];
      // this.saveDecks();
    },
    orderDeckExtra(): void {
      const deck = this.getDeckSelected();
      const fusion = deck.extra.filter((c: Card) => c.type.toLocaleLowerCase().includes("fusion")).sort((a: Card, b: Card) => a.id - b.id);
      const synchro = deck.extra.filter((c: Card) => c.type.toLocaleLowerCase().includes("synchro")).sort((a: Card, b: Card) => a.id - b.id);
      const xyz = deck.extra.filter((c: Card) => c.type.toLocaleLowerCase().includes("xyz")).sort((a: Card, b: Card) => a.id - b.id);
      const link = deck.extra.filter((c: Card) => c.type.toLocaleLowerCase().includes("link")).sort((a: Card, b: Card) => a.id - b.id);
      this.decks[this.nameDeckSelected].extra = [...fusion, ...synchro, ...xyz, ...link];
      // this.saveDecks();
    },
  },
});

app.mount('#app');
