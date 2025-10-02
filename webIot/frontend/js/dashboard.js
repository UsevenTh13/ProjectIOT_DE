function renderChart(data) {
  let ctx = document.getElementById("ppmChart").getContext("2d");

  // Ambil data untuk sumbu X (waktu) dan Y (ppm)
  let ppmData = data.map(d => d.ppm);
  let waktuData = data.map(d => new Date(d.waktu).toLocaleTimeString());

  // Hapus chart lama kalau sudah ada (supaya tidak double render)
  if (window.ppmChart) {
    window.ppmChart.destroy();
  }

  // Buat chart baru
  window.ppmChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: waktuData,
      datasets: [{
        label: 'PPM',
        data: ppmData,
        borderColor: (ctx) => {
          let value = ctx.raw;
          if (value <= 400) return 'limegreen';    // Baik
          if (value <= 1000) return 'yellow';      // Sedang
          if (value <= 2000) return 'orange';      // Tidak Sehat
          return 'red';                            // Berbahaya
        },
        backgroundColor: (ctx) => {
          let value = ctx.raw;
          if (value <= 400) return 'rgba(0,255,0,0.2)';
          if (value <= 1000) return 'rgba(255,255,0,0.2)';
          if (value <= 2000) return 'rgba(255,165,0,0.2)';
          return 'rgba(255,0,0,0.2)';
        },
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: 'white' } },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              let value = ctx.raw;
              let kategoriTxt = "Baik";
              if (value <= 400) kategoriTxt = "Baik";
              else if (value <= 1000) kategoriTxt = "Sedang";
              else if (value <= 2000) kategoriTxt = "Tidak Sehat";
              else kategoriTxt = "Berbahaya";
              return `PPM: ${value} → ${kategoriTxt}`;
            }
          }
        },
        annotation: {
          annotations: {
            baik: {
              type: 'line',
              yMin: 400,
              yMax: 400,
              borderColor: 'green',
              borderWidth: 2,
              label: {
                content: 'Batas Baik (400)',
                enabled: true,
                position: 'start',
                xAdjust: 10,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white'
              }
            },
            sedang: {
              type: 'line',
              yMin: 1000,
              yMax: 1000,
              borderColor: 'yellow',
              borderWidth: 2,
              label: {
                content: 'Batas Sedang (1000)',
                enabled: true,
                position: 'start',
                xAdjust: 10,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white'
              }
            },
            tidakSehat: {
              type: 'line',
              yMin: 2000,
              yMax: 2000,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                content: 'Tidak Sehat (2000)',
                enabled: true,
                position: 'start',
                xAdjust: 10,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white'
              }
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: 'white' } },
        y: { 
          ticks: { color: 'white' },
          beginAtZero: true
        }
      }
    }
  });
}
