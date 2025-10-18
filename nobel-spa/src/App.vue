<template>
  <div class="container">
    <header>
      <h1 class="logo">
        <span>N</span><span>o</span><span>b</span><span>e</span><span>l</span>
        <span> </span>
        <span>P</span><span>r</span><span>i</span><span>z</span><span>e</span>
      </h1>
      <nav>
        <RouterLink class="menu-href" to="/prizes">Награды</RouterLink>
        <RouterLink class="menu-href" to="/laureates">Лауреаты</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <h1 class="name">Бобков Андрей Сергеевич МО-231</h1>
      <h1 class="goida"><span>Г</span><span>О</span><span>Й</span><span>Д</span><span>А</span></h1>
    </footer>
  </div>
</template>
