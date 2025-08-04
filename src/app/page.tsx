
import ComponentButtons from "@/components/ComponentButtons/ComponentButtons";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Preview from "@/components/Preview/Preview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-auto scroll-smooth">
      <Header />
      <main className="flex flex-col flex-grow text-center mx-5">
        <ComponentButtons />
        <Preview />
      </main>
      <Footer />
    </div>
  );
}
