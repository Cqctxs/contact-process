import Image from "next/image";

export default function Home() {
  return (
    <main>
    <div>
      
      <header className="bg-gray-900 text-white text-center p-4">
        <h1 className="text-2xl">Equilibrium in Sulfuric Acid Production</h1>
      </header>
      <nav className="bg-gray-700 p-2 text-center">
        <a href="#introduction" className="text-white mx-4">Introduction</a>
        <a href="#equilibrium" className="text-white mx-4">Equilibrium Principle</a>
        <a href="#contact" className="text-white mx-4">Contact</a>
      </nav>
      <main className="w-4/5 mx-auto p-6 bg-white shadow-md mt-4">
        <section id="introduction" className="mb-6">
          <h2 className="text-xl font-bold">Sulfuric Acid - The King of Chemicals!</h2>
          <p>Did you know sulfuric acid is the world's largest volume industrial chemical? It's used in everything from making fertilizers to producing steel and refining petroleum. Its production relies heavily on chemical equilibrium principles to ensure efficiency and high yields.</p>
        </section>
        <section id="equilibrium" className="mb-6">
          <h2 className="text-xl font-bold">The Role of Equilibrium</h2>
          <p>The Contact Process involves the reaction: 2SO₂ + O₂ ⇌ 2SO₃. The conditions must be optimized to maximize yield while maintaining efficiency.</p>
        </section>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4 mt-4">
        <p>© 2025 Sulfuric Acid Equilibrium. All rights reserved.</p>
      </footer>
    </div>
      
  </main>
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
