<template>
  <ul class="sticky flex items-center overflow-x-auto bg-gray-50 justify-between xl:hidden top-14 z-0 shadow-md">
    <!-- futuramente tera um for aqui... -->
    <MenuItemSticky title="Promoções" link="#promocoes" />
    <MenuItemSticky title="Combos" link="#combos" />
    <MenuItemSticky title="Especiais" link="#especiais" />
    <MenuItemSticky title="Sanduiches" link="#sanduiches" />
    <MenuItemSticky title="Porções" link="#porcoes" />
    <MenuItemSticky title="Clássicos" link="#classicos" />
    <MenuItemSticky title="Sobremesas" link="#sobremesas" />
    <MenuItemSticky title="Refrigerantes" link="#refrigerantes" />
    <MenuItemSticky title="Cervejas" link="#cervejas" />
  </ul>
  <div class="container mx-auto">
    <div>
      <SectionTitle id="promocoes" title="PROMOÇÕES" />
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <!-- futuramente tera um for aqui... -->
      <CardItem title="0Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="8Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="9Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
    </div>
    <div>
      <SectionTitle id="combos" title="COMBOS" />
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <!-- futuramente tera um for aqui... -->
      <CardItem title="0Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="8Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="9Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
    </div>
    <div>
      <SectionTitle id="especiais" title="ESPECIAIS" />
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <!-- futuramente tera um for aqui... -->
      <CardItem title="0Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="8Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="9Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
      <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
    </div>
    <div>
      <SectionTitle id="sanduiches" title="SANDUICHES" />
    </div>
    <div>
      <SectionTitle id="porcoes" title="PORÇÕES" />
    </div>
    <div>
      <SectionTitle id="classicos" title="CLÁSSICOS" />
    </div>
    <div>
      <SectionTitle id="sobremesas" title="SOBREMESAS" />
    </div>
    <div>
      <SectionTitle id="refrigerantes" title="REFRIGERANTES" />
    </div>
    <div>
      <SectionTitle id="cervejas" title="CERVEJAS" />
    </div>
  </div>
</template>

<script setup>
import MenuItemSticky from '../components/MenuItemSticky.vue';
import CardItem from '../components/CardItem.vue';
import SectionTitle from '../components/SectionTitle.vue';

</script>
