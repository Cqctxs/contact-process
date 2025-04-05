// app/page.js 

import Image from "next/image";
import Link from "next/link";
// Import the BlockMath component from react-katex
import { BlockMath } from "react-katex";

export default function Home() {
  // Define the LaTeX string for the equation
  // Note the double backslashes needed for JavaScript strings
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-gray-100 text-center p-6 rounded-b-xl shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Equilibrium in Sulfuric Acid Production
        </h1>
        <p className="mt-2 text-gray-400 font-light">
          Understanding the Chemical Principles Behind Industrial Production
        </p>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800/90 p-4 text-center sticky top-0 z-10 shadow-lg backdrop-blur-sm">
        <div className="flex justify-center space-x-2 md:space-x-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/simulation"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium"
          >
            Simulation
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-11/12 md:w-4/5 mx-auto p-4 md:p-6 mt-6 mb-12 space-y-12">
        {/* Introduction Section */}
        <section id="introduction" className="group">
          {/*Introduction content*/}
          <div className="bg-gray-800/80 hover:bg-gray-800/90 transition-all p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 tracking-tight">
              Sulfuric Acid: A Fundamental Industrial Chemical
            </h2>
            <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
              <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                <p className="text-gray-300 leading-relaxed">
                  Sulfuric acid is the world&apos;s largest volume industrial
                  chemical, used in everything from making fertilizers to
                  producing steel and refining petroleum. Its production relies
                  heavily on chemical equilibrium principles to ensure
                  efficiency and high yields.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Its production nears the highest of any chemical in the world,
                  totalling over 200 million tons a year! So how do we keep up
                  with the production? It&apos;s all in the equilibrium!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equilibrium Section */}
        <section id="equilibrium" className="group">
          <div className="bg-gray-800/80 hover:bg-gray-800/90 transition-all p-6 rounded-2xl shadow-lg border border-gray-700">
            <div className="space-y-6">
              {/* Production Section */}
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                  Production of Sulfuric Acid
                </h3>
                <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                  <p className="text-gray-300 leading-relaxed">
                    The first step to the production of sulfuric acid is to
                    create the sulfur dioxide (SO₂) from the sulfur (S) and
                    oxygen (O₂) gases. Sulfur is a common chemical, produced
                    from a variety of other industrial processes as a waste
                    product. Oxygen is just as common and can be produced from
                    many sources. Together, they are the building blocks of the
                    industrial production of sulfuric acid. This reaction is not
                    reversible, so its relatively straightforward for industrial
                    chemists to control. The balanced chemical equation for this
                    equilibrium is:
                  </p>
                  <div className="my-4 text-center text-lg bg-gray-900/50 py-3 rounded-md">
                    <BlockMath
                      math={
                        "S_{(\\text{l})} + O_{2(\\text{g})} \\rightarrow SO_{2(\\text{g})}"
                      }
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Now, using the sulfur dioxide previously synthesized, it can
                    be reacted with additional oxygen gas to produce sulfur
                    trioxide (SO₃). This step is also known as the Contact
                    Process, and is a very important step in the production,
                    since unlike the first step, this step is reversible, so
                    multiple factors must be controlled to maintain optimal
                    equilibrium position. The balanced chemical equation for
                    this equilibrium is:
                  </p>
                  <div className="my-4 text-center text-lg bg-gray-900/50 py-3 rounded-md">
                    <BlockMath
                      math={
                        "2SO_{2(\\text{g})} + O_{2(\\text{g})} \\rightleftharpoons 2SO_{3(\\text{g})} + 196 \\text{ kJ/mol}"
                      }
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    This reaction is exothermic (releases heat) and involves a
                    decrease in the number of gas moles. Understanding how to
                    manipulate this equilibrium is vital for maximizing SO₃
                    production. How the optimal industrial conditions were
                    chosen will be further discussed in the next section.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    The final step of the reaction is the process of reacting
                    water with the sulfur trioxide to produce sulfuric acid.
                    This reaction has an extremely high rate of reaction and is
                    very exothermic, releasing an extreme amount of energy. Due
                    to this, the reaction ends up being highly dangerous.
                  </p>
                  <div className="my-4 text-center text-lg bg-gray-900/50 py-3 rounded-md">
                    <BlockMath
                      math={
                        "H_2O_{(\\text{l})} + SO_{3(\\text{g})} \\rightarrow H_2SO_{4(\\text{aq})}"
                      }
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    In the industrial production process, sulfur trioxide is
                    added to concentrated sulfuric acid to form a liquid called
                    oleum. Then, water can be added to produce the sulfuric
                    acid, in a much more controllable reaction. The balanced
                    chemical equation for this equilibrium is:
                  </p>
                  <div className="my-4 text-center text-lg bg-gray-900/50 py-3 rounded-md">
                    <BlockMath
                      math={
                        "SO_{3(\\text{g})} + H_2SO_{4(\\text{l})} \\rightarrow H_2S_2O_{7(\\text{l})}"
                      }
                    />
                    <BlockMath
                      math={
                        "H_2S_2O_{7(\\text{l})} + H_2O_{(\\text{l})} \\rightarrow 2H_2SO_{4(\\text{l})}"
                      }
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    Finally, we are left with our desired sulfuric acid!
                  </p>
                </div>
              </div>
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                  The Role of Equilibrium
                </h3>
                <div className="space-y-5">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Rate-Limiting Step
                    </h4>
                    <p className="text-gray-300">
                      Sulfuric acid is produced in multiple steps. The synthesis
                      of sulfur trioxide from sulfur dioxide and oxygen gas is
                      the critical, rate-limiting equilibrium step that
                      determines the overall efficiency. Once SO₃ is formed, it
                      readily reacts with sulfuric to form oleum, which then is
                      converted back into more sulfuric acid to produce the
                      final product.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Optimizing Conditions
                    </h4>
                    <p className="text-gray-300">
                      Like the Haber process for ammonia, the Contact Process
                      doesn&apos;t naturally proceed with high yield under simple
                      conditions. The dynamic equilibrium must be carefully
                      managed by optimizing temperature, pressure, and reactant
                      concentrations to maximize yield efficiently and
                      economically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Le Châtelier&apos;s Principle Section */}
              <div className="bg-gray-900/80 p-5 md:p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 tracking-tight">
                  How Equilibrium Affects the Process: Le Châtelier&apos;s Principle
                </h3>
                <div className="space-y-5">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Temperature Effects
                    </h4>
                    <p className="text-gray-300">
                      The forward reaction (SO₃ formation) is exothermic (ΔH is
                      negative). Le Châtelier&apos;s principle predicts that lower
                      temperatures favor the product side. However, reaction
                      rates decrease significantly at low temperatures.
                      Therefore, a compromise temperature of 400-450°C is
                      typically used to achieve an acceptable rate without
                      sacrificing too much yield.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Pressure Considerations
                    </h4>
                    <p className="text-gray-300">
                      The forward reaction converts 3 moles of gas (2 SO₂ + 1
                      O₂) into 2 moles of gas (2 SO₃). Increasing the pressure
                      shifts the equilibrium toward the side with fewer moles
                      (products), favoring SO₃ formation. However, high-pressure
                      equipment is expensive. Fortunately, good yields can be
                      obtained at relatively low pressures (1-2 atm), especially
                      with optimized temperature and catalyst use.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-indigo-500">
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Concentration Factors
                    </h4>
                    <p className="text-gray-300">
                      Increasing the concentration of reactants (SO₂ or O₂)
                      shifts the equilibrium to the right, increasing SO₃ yield.
                      Since oxygen (from air) is relatively inexpensive, an
                      excess of oxygen is often used to drive the reaction
                      forward and maximize the conversion of the more valuable
                      SO₂.
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
                    While catalysts do not affect the position of equilibrium
                    (the final yield percentages at equilibrium), they
                    dramatically increase the rate at which equilibrium is
                    reached. Without a catalyst, the reaction is far too slow to
                    be economically viable. Vanadium(V) oxide (V₂O₅) is the
                    standard catalyst used in the Contact Process, allowing the
                    reaction to proceed quickly at the compromise temperature.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-2">
              Check out the simulation to visually see how changing the
              conditions of the reaction affect the equilibrium! Play around
              with the sliders and check out various views of the reaction. Drag
              the canvas to orbit around, and scroll to zoom in and out. Note
              that the simulation is mostly qualitative, and doesn&apos;t fully
              represent the real-world equilibrium conditions (approx Keq and
              rates).
            </p>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center p-4 text-sm">
        <p>Sean Zhao & Alex Zhu | Contact Process Simulation</p>
      </footer>
    </div>
  );
}
