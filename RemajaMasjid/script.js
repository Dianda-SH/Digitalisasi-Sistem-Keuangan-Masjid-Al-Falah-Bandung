/* =========================
   USER LOGIN
========================= */

const namaAdmin =
document.getElementById("namaAdmin");

const usernameLogin =
localStorage.getItem("username");

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
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

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
   MENU HYPERLINK
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
   AUTO CLOSE MOBILE
========================= */

const menuLinks =
document.querySelectorAll(
  ".menu a"
);

menuLinks.forEach((link)=>{

  link.addEventListener(
    "click",
    ()=>{

      if(window.innerWidth <= 900){

        sidebar.classList.remove(
          "active"
        );

        sidebarOpen = false;

      }

    }
  );

});

/* =========================
   KLIK LUAR SIDEBAR
========================= */

document.addEventListener(
  "click",
  (e)=>{

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