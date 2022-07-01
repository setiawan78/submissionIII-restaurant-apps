class NavbarComps extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header class="app-bar">
                <div class="app-bar__menu">
                    <button id="hamburgerButton">☰</button>
                </div>
                <div class="app-bar__brand">
                    <h3>WaroengKu Apps</h3>
                </div>
                <nav id="navigationDrawer" class="app-bar__navigation">
                    <ul>
                        <li class="navitems"><a href="#/">Home</a></li>
                        <li class="navitems"><a href="#/favorite">Favorite</a></li>
                        <li class="navitems"><a href="https://www.linkedin.com/in/indra-setiawan-b2009822b/" target="_blank" rel="noopener">About Us</a></li>
                    </ul>
                </nav>
            </header>
            `;
  }
}

customElements.define('navbar-comps', NavbarComps);
