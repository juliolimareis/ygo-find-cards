const app = new Vue({
  el: '#app',
  data: {
    cards:[],
    search: "",
    isLoading: false,
    zoom: '15rem',
    cardSelected: null,
  },
  methods:{
    openCard(card){
      this.cardSelected = card;
    },
    onZoom(_cardSelected){
      this.cards = this.cards.map(card => {
        if(card.id === _cardSelected.id){
          card.zoom = true;
        }else{
          card.zoom = false;
        }
        return card;
      });
    },
    onCards(){
      if(this.search.trim()){
        this.isLoading = true
        axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=".concat(this.search))
        .then((response) => {
          console.log(response.data.data)
          this.cards = response.data.data
        })
        .catch((error) => {
          this.cards = []
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false;
        })
      }else{
        this.cards = [];
      }
    }
  }
})