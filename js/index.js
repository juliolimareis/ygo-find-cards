const app = new Vue({
  el: '#app',
  data: {
    cards:[],
    search: "",
    isLoading: false,
    zoom: '15rem',
    cardSelected: null,
    urlYgoProdeck: "https://db.ygoprodeck.com/api/v7/cardinfo.php"
  },
  methods:{
    handleErrorImage() {
      document.getElementsByClassName(card.id)[0].src = "assets/card-error.png"
      document.getElementsByClassName(card.id)[0].onerror = ""
      return true;
    },
    onLoadImage(card) {
      document.getElementsByClassName(card.id)[0].src = card.card_images[0].image_url
    },
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
        axios.get(this.urlYgoProdeck.concat("?fname=").concat(this.search))
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