import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-gray-100 text-center p-6 rounded-b-xl shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Equilibrium in Sulfuric Acid Production</h1>
        <p className="mt-2 text-gray-400 font-light">Understanding the Chemical Principles Behind Industrial Production</p>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800/90 p-4 text-center sticky top-0 z-10 shadow-lg backdrop-blur-sm">
        <div className="flex justify-center space-x-2 md:space-x-6">
          <a href="#introduction" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            Introduction
          </a>
          <a href="#equilibrium" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            Equilibrium
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-11/12 md:w-4/5 mx-auto p-4 md:p-6 mt-6 mb-12 space-y-12">
        {/* Introduction Section */}
        <section id="introduction" className="group">
          <div className="bg-gray-800/80 hover:bg-gray-800/90 transition-all p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 tracking-tight">
              Sulfuric Acid - The King of Chemicals!
            </h2>
            <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                Sulfuric acid is the world's largest volume industrial chemical, used in everything from making fertilizers to producing steel and refining petroleum. Its production relies heavily on chemical equilibrium principles to ensure efficiency and high yields.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Its production nears the highest of any chemical in the world, totalling over 200 million tons a year! So how do we keep up with the production? It's all in the equilibrium!!
              </p>
            </div>
          </div>
        </section>

        {/* Equilibrium Section */}
        <section id="equilibrium" className="group">
          <div className="bg-gray-800/80 hover:bg-gray-800/90 transition-all p-6 rounded-2xl shadow-lg border border-gray-700">
            <div className="space-y-6">
              
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                The Role of Equilibrium
                </h3>

                <div className="space-y-5">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">Temperature Effects</h4>
                    <p className="text-gray-400">
                    Sulphuric acid is produced in two steps, the first of which is a reaction where sulphur dioxide and oxygen gas are used to synthesize sulphur trioxide. With the synthesis of sulfur trioxide, water can easily be added to create sulfuric acid. In this reaction, the rate limiting step is the first, where sulphur dioxide and oxygen gas react to form sulphur trioxide.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">Pressure Considerations</h4>
                    <p className="text-gray-400">
                    Just like how in the Haber process, ammonia tends to split into nitrogen gas and hydrogen gas, sulphuric acid also doesn't tend to be easily synthesized. The rate limiting step we've mentioned is called the Contact Process. Similar to the Haber process, the dynamic equilibrium of the reaction is the determining factor of how efficiently the reaction can proceed. The conditions must be optimized to maximize yield while maintaining efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="w-full h-64 bg-gray-900 flex items-center justify-center rounded-xl border border-gray-700">
                <span className="text-gray-500">Reaction Diagram Placeholder</span>
              </div>

              {/* Le Châtelier's Principle Section */}
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                  How Equilibrium Affects the Process: Le Châtelier's Principle
                </h3>

                <div className="space-y-5">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">Temperature Effects</h4>
                    <p className="text-gray-400">
                      The reaction is exothermic, meaning that lower temperatures favor the forward reaction. However, temperature plays a big role in the rate of the reaction, where too low of a temperature will slow down the reaction rate. Yet, a higher temperature will favour the backwards reaction. Experimentally determined, an optimal temperature of 400-450°C is used to balance rate and yield.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">Pressure Considerations</h4>
                    <p className="text-gray-400">
                      On the left side, there are 3 moles of gas, and on the right, there are 2. Therefore increasing the pressure shifts equilibrium toward the side with fewer moles of gas (right side), increasing SO₃ yield. However, creating high pressure environments are expensive to manage and control, so a compromise is chosen, around 1-2 atm.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">Concentration Factors</h4>
                    <p className="text-gray-400">
                      By increasing the concentration of reactants, the reaction will shift towards the right, thus producing more sulphur trioxide. Since oxygen is comparably cheaper and more common compared to sulphur dioxide, an excess of oxygen gas is added to the system to create more sulphur trioxide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Catalyst Section */}
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                  Catalyst Usage
                </h3>
                <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                  <p className="text-gray-300 leading-relaxed">
                    Catalysts don't impact the actual position of equilibrium, rather only the rate of the reaction. Yet, without a catalyst, the rate of the reaction is incredibly slow, where virtually no sulphur trioxide is created at an economical rate, so a vanadium(V) oxide (V₂O₅) catalyst is used to speed up the reaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Catalyst Diagram Placeholder */}
            <div className="w-full h-64 bg-gray-900 flex items-center justify-center rounded-xl border border-gray-700">
              <span className="text-gray-500">Catalyst Diagram Placeholder</span>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center p-4 text-sm">
        <p> hi sena zhao</p>
      </footer>
    </div >
  );
}