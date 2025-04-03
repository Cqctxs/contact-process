import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <header className="bg-gray-900 text-white text-center p-4">
        <h1 className="text-2xl">Equilibrium in Sulfuric Acid Production</h1>
      </header>
      <nav className="bg-gray-700 p-2 text-center">
        <a href="#introduction" className="text-white mx-4">Introduction</a>
        <a href="#equilibrium" className="text-white mx-4">Equilibrium Principle</a>
        <a href="#contact" className="text-white mx-4">Contact</a>
      </nav>
      <main className="w-4/5 mx-auto p-8 bg-white shadow-lg mt-6 rounded-lg">
        <section id="introduction" className="mb-10">
          <h2 className="text-2xl font-bold">Sulfuric Acid - The King of Chemicals!</h2>
          <p className="mt-2 text-lg">Sulfuric acid is the world's largest volume industrial chemical, used in everything from making fertilizers to producing steel and refining petroleum. Its production relies heavily on chemical equilibrium principles to ensure efficiency and high yields. Its production nears the highest of any chemical in the world, totalling over 200 million tons a year! So how do we keep up with the production? It's all in the equilibrium!!</p>
        </section>
        <section id="equilibrium" className="mb-10">
          <h2 className="text-2xl font-bold">The Role of Equilibrium</h2>

          <p className="mt-2 text-lg">Sulphuric acid is produced in two steps, the first of which is a reaction where sulphur dioxide and oxygen gas are used to synthesize sulphur trioxide. With the synthesis of sulfur trioxide, water can easily be added to create sulfuric acid. In this reaction, the rate limiting step is the first, where sulphur dioxide and oxygen gas react to form sulphur trioxide.</p>

          <p className="mt-2 text-lg">Just like how in the Haber process, ammonia tends to split into nitrogen gas and hydrogen gas, sulphuric acid also doesn't tend to be easily syntehsized. The ratae limiting step we've mentioned is called the Contact Process. Similar to the Haber process, the dynamic equilibrium of the reaction is the determining factor of how efficiently the reaction can proceed. The conditions must be optimized to maximize yield while maintaining efficiency.</p> 

          <div className="w-full h-64 bg-gray-300 mt-4 flex items-center justify-center">Image Placeholder</div>

          {/* <h3 className="text-xl font-bold mt-6">A Key Step: The Contact Process</h3>
          <p className="font-bold mt-4">The key equilibrium reaction is:</p>
          <p className="text-lg text-blue-600">2SO₂(g) + O₂(g) ⇌ 2SO₃(g) ΔH = −196 kJ/mol</p> */}

          <div className="w-full h-64 bg-gray-300 mt-4 flex items-center justify-center">Diagram Placeholder</div>
          <h3 className="text-xl font-bold mt-6">How Equilibrium Affects the Process: Le Châtelier’s Principle</h3>
          <ul className="list-disc pl-6 mt-2 text-lg">
            <li>The reaction is exothermic, meaning that lower temperatures favor the forward reaction. However, temperature plays a big role in the rate of the reaction, where too low of a temperature will slow down the reaction rate. Yet, a higher temperature will favour the backwards reaction. Expirimentally determined, an optimal temperature of 400-450°C is used to balance rate and yield.</li>
            <li>On the left side, there are 3 moles of gas, and on the right, there are 2. Therefore increasing the pressure shifts equilibrium toward the side with fewer moles of gas (right side), increasing SO₃ yield. However, creating high pressure environments are expensive to manage and control, so an comprimise is chosen, around 1-2 atm.</li>
            <li>By increasing the concentration of reactants, the reaction will shift towards the right, thus producing more sulpher trioxide. Since oxygen comparible cheaper and more common compatred to sulpher dioxide, an excess of oxygen gas is added to the system to create more sulphur trioxide.</li>
          </ul>
          <h3 className="text-xl font-bold mt-6">Catalyst Usage</h3>
          <p className="mt-2 text-lg">Catalysts don’t impact the actual position of equilibrium, rather only the rate of the reaction. Yet, without a catalyst, the rate of the reaction is incredibly slow, where virtulally no sulphur trioxide is created at a economical rate, so a vanadium(V) oxide (V₂O₅) catalyst is used to speed up the reaction.</p>
          <div className="w-full h-64 bg-gray-300 mt-4 flex items-center justify-center">Catalyst Diagram Placeholder</div>
        </section>
      </main>
    </div>
      // <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      //   <a
      //     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      //     href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     <Image
      //       aria-hidden
      //       src="/file.svg"
      //       alt="File icon"
      //       width={16}
      //       height={16}
      //     />
      //     Learn
      //   </a>
      //   <a
      //     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      //     href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     <Image
      //       aria-hidden
      //       src="/window.svg"
      //       alt="Window icon"
      //       width={16}
      //       height={16}
      //     />
      //     Examples
      //   </a>
      //   <a
      //     className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      //     href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     <Image
      //       aria-hidden
      //       src="/globe.svg"
      //       alt="Globe icon"
      //       width={16}
      //       height={16}
      //     />
      //     Go to nextjs.org →
      //   </a>
      // </footer>
    
  );
}
