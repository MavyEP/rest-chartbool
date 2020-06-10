
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

$.ajax({
  'url' : "http://157.230.17.132:4017/sales",
  'method' : "GET",

    'success' : function (data) {
      var files = data;
      for (var i = 0; i < data.length; i++) {
        var elemento_corrente = data[i];
        var data_elemento = elemento_corrente.date;
        var mese  = moment(data_elemento , "DD/MM/YY").format("MMMM");
        var guadagno_vendita = elemento_corrente.amount;
        // console.log(guadagno_vendita);
        var venditore = elemento_corrente.salesman;
        // console.log(venditore);
          mesi[mese] += guadagno_vendita;
        console.log(mesi);
      }

      var mesi_key = Object.keys(mesi);
      var valori = Object.values(mesi);

      // GRAPH SETTINGS
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: mesi_key,
              datasets: [{
                  label: 'Amount per month',
                  data: valori,
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

    },
    'error' : function () {
      console.log("server error");
    }
});
