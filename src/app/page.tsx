import { Navigation } from "@/components/layout/Navigation";
import { PiedDePage } from "@/components/layout/PiedDePage";
import { Bientot } from "@/components/sections/Bientot";
import { Contact } from "@/components/sections/Contact";
import { Espaces } from "@/components/sections/Espaces";
import { Galerie } from "@/components/sections/Galerie";
import { Heritage } from "@/components/sections/Heritage";
import { Hero } from "@/components/sections/Hero";
import { Ruban } from "@/components/sections/Ruban";
import { Salles } from "@/components/sections/Salles";
import { Sejours } from "@/components/sections/Sejours";

export default function Accueil() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Ruban />
        <Heritage />
        <Galerie />
        <Espaces />
        <Sejours />
        <Salles />
        <Bientot />
        <Contact />
      </main>
      <PiedDePage />
    </>
  );
}
