//variabile per il grafico sull'andamento annuale
var mesi = {
  January : 0,
  February : 0,
  March : 0,
  April : 0,
  May : 0,
  June : 0,
  July : 0,
  August : 0,
  September : 0,
  October : 0,
  November : 0,
  December : 0
};

//variabile per il grafico sui venditori
var venditore = {};

//chiamata per la richiesta dei dati
$.ajax({
  'url' : "http://157.230.17.132:4017/sales",
  'method' : "GET",
      'success' : function (data) {
        var files = data;
        for (var i = 0; i < data.length; i++) {
          var elemento_corrente = data[i];
          //prendo la data
          var data_elemento = elemento_corrente.date;
          //ne visualizzo solamente il mese
          var mese  = moment(data_elemento , "DD/MM/YY").format("MMMM");
          //prendo il guadagno della rispettiva vendita
          var guadagno_vendita = elemento_corrente.amount;
          //mi prendo chi ha effettuato la vendita
          var venditore_corrente = elemento_corrente.salesman;
          //aggiungo le informazioni all oggetto mesi
            mesi[mese] += guadagno_vendita;
            // creo un if per aggiungere sia le keys ovvero i nomi del venditore piu il valore della vendita
            if (!venditore.hasOwnProperty(venditore_corrente)) {
              venditore[venditore_corrente] = guadagno_vendita;
            } else {
              venditore[venditore_corrente] += guadagno_vendita;
            }
        }

      //prendo le chiavi ed i valori corrispettivi
      var mesi_key = Object.keys(mesi);
      var valori = Object.values(mesi);

      //stampo il primo grafico
      graph_first(mesi_key , valori);

      //prendo le chiavi ed i valori corrispettivi
      var venditore_key = Object.keys(venditore);
      var venditore_valori = Object.values(venditore);
      
      //stampo il secondo grafico
      graph_second(venditore_key , venditore_valori)
    },
    'error' : function () {
      console.log("server error");
    }
});








function graph_first(valore , dati) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: valore,
          datasets: [{
              label: 'Amount per month',
              data: dati,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
  });
};


function graph_second(valore , dati) {
  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: valore,
          datasets: [{
              label: 'Amount per Seller',
              data: dati,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
          }]
      },
  });
};
