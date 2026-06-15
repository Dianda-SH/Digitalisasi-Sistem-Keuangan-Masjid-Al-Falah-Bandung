/* =========================
   USER LOGIN
========================= */

const namaAdmin =
document.getElementById(
  "namaAdmin"
);

const usernameLogin =
localStorage.getItem(
  "username"
);

if(usernameLogin && namaAdmin){

  namaAdmin.innerHTML =

  usernameLogin.charAt(0)
  .toUpperCase()

  +

  usernameLogin.slice(1);

}

/* =========================
   SIDEBAR
========================= */

const sidebar =
document.querySelector(
  ".sidebar"
);

const menuBtn =
document.getElementById(
  "menuBtn"
);

let sidebarOpen = false;

/* TOGGLE SIDEBAR */

if(menuBtn){

  menuBtn.addEventListener(
    "click",
    ()=>{

      sidebar.classList.toggle(
        "active"
      );

      sidebarOpen =
      !sidebarOpen;

    }
  );

}

/* =========================
   MENU
========================= */

const menuDashboard =
document.getElementById(
  "menuDashboard"
);

const menuRemajaMasjid =
document.getElementById(
  "menuRemajaMasjid"
);

const menuHarian =
document.getElementById(
  "menuHarian"
);

const menuJumat =
document.getElementById(
  "menuJumat"
);

const menuPengeluaran =
document.getElementById(
  "menuPengeluaran"
);

const menuLogout =
document.getElementById(
  "menuLogout"
);

/* DASHBOARD */

if(menuDashboard){

  menuDashboard.onclick =
  ()=>{

    window.location.href =
    "../Dashboard/index.html";

  };

}

/* REMAJA MASJID */

if(menuRemajaMasjid){

  menuRemajaMasjid.onclick =
  ()=>{

    window.location.href =
    "../RemajaMasjid/index.html";

  };

}

/* HARIAN */

if(menuHarian){

  menuHarian.onclick =
  ()=>{

    window.location.href =
    "../InfaqHarian/index.html";

  };

}

/* JUMAT */

if(menuJumat){

  menuJumat.onclick =
  ()=>{

    window.location.href =
    "../InfaqJumat/index.html";

  };

}

/* PENGELUARAN */

if(menuPengeluaran){

  menuPengeluaran.onclick =
  ()=>{

    window.location.href =
    "../Pengeluaran/index.html";

  };

}

/* LOGOUT */

if(menuLogout){

  menuLogout.onclick =
  ()=>{

    localStorage.clear();

    window.location.href =
    "../index.html";

  };

}

/* =========================
   TUTUP SIDEBAR MOBILE
========================= */

const menuLinks =
document.querySelectorAll(
  ".menu a"
);

menuLinks.forEach((link)=>{

  link.addEventListener(
    "click",
    ()=>{

      if(
        window.innerWidth <= 900
      ){

        sidebar.classList.remove(
          "active"
        );

        sidebarOpen = false;

      }

    }
  );

});

/* =========================
   TUTUP SAAT KLIK LUAR
========================= */

document.addEventListener(
  "click",
  (e)=>{

    if(!sidebar || !menuBtn)
    return;

    const klikSidebar =
    sidebar.contains(e.target);

    const klikMenu =
    menuBtn.contains(e.target);

    if(

      sidebarOpen &&

      !klikSidebar &&

      !klikMenu &&

      window.innerWidth <= 900

    ){

      sidebar.classList.remove(
        "active"
      );

      sidebarOpen = false;

    }

  }
);

/* =========================
   URL API
========================= */

const URL_API =
"https://script.google.com/macros/s/AKfycbzJFs3MGOcH-785ynYBCr_nugYClLpb8YxFWELZEHU1R3Mo-KZUCb2hJ44yZouKgoRn/exec";

/* =========================
   ELEMENT
========================= */

const saldo =
document.getElementById(
  "saldo"
);

const pemasukan =
document.getElementById(
  "pemasukan"
);

const pengeluaran =
document.getElementById(
  "pengeluaran"
);

const tbody =
document.getElementById(
  "tbody"
);

/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(
  angka
){

  return "Rp " +

  Number(angka)
  .toLocaleString(
    "id-ID"
  );

}

/* =========================
   DATA KEUANGAN
========================= */

let semuaData = [];

/* =========================
   AMBIL DATA SPREADSHEET
========================= */

let loadingData = false;

async function ambilDataSpreadsheet(){

  /* CEGAH DOUBLE FETCH */

  if(loadingData) return;

  loadingData = true;

  try{

    const daftarSheet = [

      "Infaq Harian",
      "Infaq Jumat",
      "Pengeluaran"

    ];

    let dataBaru = [];

    /* LOOP SEMUA SHEET */

    for(const namaSheet of daftarSheet){

      const response =
      await fetch(

        URL_API +

        "?sheet=" +

        encodeURIComponent(namaSheet)

      );

      const result =
      await response.json();

      /* CEK DATA */

      if(Array.isArray(result)){

        result.forEach((item)=>{

          dataBaru.push({

            jenis:
            item.jenis || namaSheet,

          tanggal:
formatTanggal(item.tanggal),

waktu:
formatWaktu(item.waktu),

            keterangan:
            item.keterangan || "",

            jumlah:
            Number(item.jumlah) || 0

          });

        });

      }

    }

    /* UPDATE DATA */

    semuaData = dataBaru;

    tampilkanDashboard();

  }catch(error){

    console.log(
      "ERROR:",
      error
    );

  }finally{

    loadingData = false;

  }

}

/* =========================
   TAMPILKAN DASHBOARD
========================= */

function tampilkanDashboard(){

  let totalMasuk = 0;

  let totalKeluar = 0;

  /* RESET TABEL */

  tbody.innerHTML = "";

  semuaData.forEach((data)=>{

    const jumlah =
    Number(data.jumlah) || 0;

    /* HITUNG */

    if(

      data.jenis
      .toLowerCase()
      .includes(
        "pengeluaran"
      )

    ){

      totalKeluar += jumlah;

    }else{

      totalMasuk += jumlah;

    }

    /* TABEL */

    const tr =
    document.createElement(
      "tr"
    );

    tr.innerHTML = `

      <td>
        ${data.jenis}
      </td>

      <td>
        ${data.tanggal}
      </td>

      <td>
        ${data.waktu}
      </td>

      <td>
        ${data.keterangan}
      </td>

      <td>
        ${formatRupiah(jumlah)}
      </td>

    `;

    tbody.appendChild(tr);

  });

  /* TOTAL SALDO */

  const totalSaldo =
  totalMasuk - totalKeluar;

  /* OUTPUT */

  saldo.innerHTML =
  formatRupiah(
    totalSaldo
  );

  pemasukan.innerHTML =
  formatRupiah(
    totalMasuk
  );

  pengeluaran.innerHTML =
  formatRupiah(
    totalKeluar
  );

  /* UPDATE CHART */

  updateChart(
    totalMasuk,
    totalKeluar
  );

}

/* =========================
   CHART
========================= */

const ctx =
document.getElementById(
  "chartKeuangan"
);

let chartKeuangan =
new Chart(ctx,{

  type:"line",

  data:{

    labels:[

      "Pemasukan",

      "Pengeluaran"

    ],

    datasets:[{

      label:"Keuangan",

      data:[0,0],

      tension:0.4,

      fill:true,

      borderWidth:3

    }]

  },

  options:{

    responsive:true,

    maintainAspectRatio:false

  }

});

/* =========================
   UPDATE CHART
========================= */

function updateChart(
  masuk,
  keluar
){

  chartKeuangan
  .data
  .datasets[0]
  .data = [

    masuk,
    keluar

  ];

  chartKeuangan.update();

}
/* =========================
   FORMAT TANGGAL
========================= */

function formatTanggal(tanggal){

  if(!tanggal) return "-";

  const tgl = new Date(tanggal);

  return tgl.toLocaleDateString(
    "id-ID",
    {
      day:"2-digit",
      month:"long",
      year:"numeric"
    }
  );

}

/* =========================
   FORMAT WAKTU
========================= */

function formatWaktu(waktu){

  if(!waktu) return "-";

  const jam = new Date(waktu);

  return jam.toLocaleTimeString(
    "id-ID",
    {
      hour:"2-digit",
      minute:"2-digit"
    }
  );

}
/* =========================
   LOAD DATA
========================= */

ambilDataSpreadsheet();

/* =========================
   AUTO REFRESH
========================= */

setInterval(()=>{

  ambilDataSpreadsheet();

},10000);