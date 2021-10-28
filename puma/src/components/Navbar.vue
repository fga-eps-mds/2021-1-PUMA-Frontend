<template>
  <div id='nav'>
    <img class='nav-item' id='logo' src='../assets/navbarLogo.svg' />
    <div id='dropdown'>
      <img class='nav-item' id='menu-button' src='../assets/navbarMenu.svg' />
      <div class="dropdown-content">
        <a href="#">Meu perfil</a>
        <a href="#">Configurações</a>
        <a href="#">Sair</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scope>
div {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #15355e;
  width: 300px;
  transform: translate(-180px);
  z-index: 1;
  font-size: 20px;
  font-family: rubik, sans-serif;
  font-weight: 300;
}

.dropdown-content a {
  height: 35px;
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

#dropdown {
  margin-top: 5px;
}

.dropdown-content a:hover {
  background-color: #265FAB;
}

#dropdown:hover .dropdown-content {
  display: block;
}

#nav {
  padding: 7 px;
  background-color: #15355e;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-weight: bold;
  color: white;
  align-items: center;
}

#logo {
  height: 18px;
}

#menu {
  position: absolute;
}

#menu-button {
  height: 55px;
}

.nav-item {
  margin-left: 45px;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
