import Link from "next/link";

export default function References() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-gray-100 text-center p-6 rounded-b-xl shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight">References</h1>
        <p className="mt-2 text-gray-400 font-light">APA Format Citation Sources</p>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800/90 p-4 text-center sticky top-0 z-10 shadow-lg backdrop-blur-sm">
        <div className="flex justify-center space-x-2 md:space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            Home
          </Link>
          <Link href="/references" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            References
          </Link>
          <Link href="/simulation" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base font-medium">
            Simulation
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-11/12 md:w-4/5 mx-auto p-4 md:p-6 mt-6 mb-12">
        <div className="bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100 mb-6 tracking-tight">Works Cited</h2>
          
          <div className="space-y-6">
            {/* Reference 1 */}
            <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                BBC. (2025). <span className="italic">Sulfuric acid – the contact process - Sulfuric acid and the contact process [GCSE Chemistry only] - GCSE Chemistry (Single Science) Revision - WJEC.</span> BBC. Retrieved April 2, 2025, from https://www.bbc.co.uk/bitesize/guides/zb7f3k7/revision/1
              </p>
            </div>

            {/* Reference 2 */}
            <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                Clark, J. (2023, January 29). <span className="italic">The Contact Process.</span> Chemistry LibreTexts. Retrieved April 1, 2025, from https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Equilibria/Le_Chateliers_Principle/The_Contact_Process
              </p>
            </div>

            {/* Reference 3 */}
            <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                Gamble, M. (2025). <span className="italic">The Contact Process.</span> Elucidate Education. Retrieved April 1, 2025, from https://www.elucidate.org.au/content/the-contact-process
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center p-4 text-sm">
        <p>© {new Date().getFullYear()} Sulfuric Acid Production Education</p>
      </footer>
    </div>
  );
}